import {HttpException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FormationsEntity } from "../shared/entities/formations.entity";
import {FormationsDto} from "../shared/dto/formations/formations.dto";
import {ActivdesactivformationsDto} from "../shared/dto/formations/activdesactivformations.dto";
import {UtilisateursEntity} from "../shared/entities/utilisateurs.entity";
import {CategoriesEntity} from "../shared/entities/categories.entity";
import {CategoriesService} from "../categories/categories.service";
import {UtilisateursService} from "../utilisateurs/utilisateurs.service";
import {UpdateformationsDto} from "../shared/dto/formations/updateformations.dto";

@Injectable()
export class FormationsService {
    constructor(
        @InjectRepository(FormationsEntity)
        private formationsRepository: Repository<FormationsEntity>,

        @InjectRepository(CategoriesEntity)
        private categorieRepository: Repository<CategoriesEntity>,

        @InjectRepository(UtilisateursEntity)
        private utilisateurRepository: Repository<UtilisateursEntity>,

        private readonly categoriesService : CategoriesService,

        private readonly utilisateursService : UtilisateursService
    ) {
    }
    async getAll(): Promise<FormationsDto[]> {
        return (await this.formationsRepository.find(
            {
                relations : {utilisateurs : true, categories : true},
                select : {
                    idFormations : true,
                    nom : true,
                    infos : true,
                    heureQuestionnaire : true,
                    actif : true,
                    dateLimiteInscription : true,
                    dateQuestionnaire : true,
                    heureLimiteInscription : true,
                }
            })).map(f => ({ ...f, categorie: f.categories, utilisateur : f.utilisateurs}))
    }

    async findById(id: number): Promise<FormationsDto> {
        try {
            const formation = await this.formationsRepository.findOneOrFail({
                relations : {categories : true, utilisateurs : true},
                where : {idFormations : id}
            });
            return {...formation, categories: formation.categories, utilisateurs : formation.utilisateurs}
        }
        catch(error) {
            console.log("l'utilisateur n'existe pas")
            throw new HttpException("l'utilisateur n'existe pas", 404)
        }
    }

    async activDesactivFormations(updateFormations : ActivdesactivformationsDto) : Promise<any>
    {
        const form = await  this.formationsRepository.findOneOrFail({
            where: {
                idFormations: updateFormations.idFormations
            },
        })
        form.actif = updateFormations.actif
        console.log("je suis une formation :", form)
        return await this.formationsRepository.update(form.idFormations, form)
            .catch((error) => {
                console.log("Problème concernant la désactivation/activation de la formation'")
                throw new HttpException("Problème concernant la désactivation/activation de la formation", 404)
            })
    }

    async createFormations(formationToCreate : FormationsDto) : Promise<any>
    {
        const categorie = await this.categorieRepository.findOneBy(
            {idCategories : formationToCreate.categories.idCategories}
        )
        const utilisateur = await this.utilisateurRepository.findOneBy(
            {idUtilisateur : formationToCreate.utilisateurs.idUtilisateur}
        )


        let formation : FormationsEntity = this.formationsRepository.create({...formationToCreate, categories:categorie, utilisateurs:utilisateur});
        console.log("formation reçue : ", formation)
        return this.formationsRepository.save(formation)
            .catch((error) => {
                console.log("problème avec la création de la formation")
                throw new HttpException("problème avec la création de la formation", 404)
            })
    }

    async updateFormations(formationToUpdate : UpdateformationsDto) : Promise<any>
    {
        const categorie = await this.categorieRepository.findOneBy(
            {idCategories : formationToUpdate.categories}
        )
        console.log("je recois ceci comme catégorie : ",categorie)
        const utilisateur = await this.utilisateurRepository.findOneBy(
            {idUtilisateur : formationToUpdate.utilisateurs}
        )
        console.log("je recois ceci comme utilisateur : ",utilisateur)
        const formation = await  this.formationsRepository.findOneOrFail({
            where: {
                idFormations: formationToUpdate.idFormations
            },
        })

        formation.nom = formationToUpdate.nom
        formation.infos = formationToUpdate.infos
        formation.actif = formationToUpdate.actif
        formation.dateLimiteInscription = formationToUpdate.dateLimiteInscription
        formation.heureLimiteInscription = formationToUpdate.heureLimiteInscription
        formation.dateQuestionnaire = formationToUpdate.dateQuestionnaire
        formation.heureQuestionnaire = formationToUpdate.heureQuestionnaire
        formation.categories = categorie
        formation.utilisateurs = utilisateur
        return await this.formationsRepository.update(formation.idFormations, formation)
            .catch((error) => {
                console.log("Problème concernant la mise a jour de la formation")
                throw new HttpException("Problème concernant la mise a jour de la formation", 404)
            })
    }
}