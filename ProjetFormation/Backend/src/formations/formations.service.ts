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
import { ErrorStatus } from "../shared/utilities/error.enum";

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
                relations : {utilisateurs : true, categories : true, syllabus:true, questions:true},
                select : {
                    idFormations : true,
                    nom : true,
                    infos : true,
                    actif : true,
                    dateheureLimiteInscription : true,
                    dateheureQuestionnaire : true,
                }
            })).map(f => ({ ...f, categorie: f.categories, utilisateur : f.utilisateurs}))
    }

    async findById(id: number): Promise<FormationsDto> {
        try {
            const formation = await this.formationsRepository.findOneOrFail({
                relations : {utilisateurs : true, categories : true, syllabus:true, questions:true},
                where : {idFormations : id}
            });
            return {...formation, categories: formation.categories, utilisateurs : formation.utilisateurs}
        }
        catch(error) {
            console.log("l'utilisateur n'existe pas")
            throw new HttpException("l'utilisateur n'existe pas", ErrorStatus.ERROR_404)
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
                throw new HttpException("Problème concernant la désactivation/activation de la formation", ErrorStatus.ERROR_404)
            })
    }

    async createFormations(formationToCreate : FormationsDto) : Promise<any>
    {
        console.log(formationToCreate.dateheureLimiteInscription + " comparer " + formationToCreate.dateheureQuestionnaire)
        if(formationToCreate.dateheureQuestionnaire < formationToCreate.dateheureLimiteInscription)
        {
            throw new HttpException("La date limite d'inscription ne doit pas être ultérieure à la date du questionnaire", ErrorStatus.ERROR_500)
        }
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
                throw new HttpException("problème avec la création de la formation", ErrorStatus.ERROR_404)
            })
    }

    async updateFormations(formationToUpdate : UpdateformationsDto) : Promise<any>
    {
        console.log(formationToUpdate.dateheureLimiteInscription + " comparer " + formationToUpdate.dateheureQuestionnaire)
        console.log(typeof(formationToUpdate.dateheureLimiteInscription))
        if(formationToUpdate.dateheureQuestionnaire < formationToUpdate.dateheureLimiteInscription)
        {
            throw new HttpException("La date limite d'inscription ne doit pas être ultérieure à la date du questionnaire", ErrorStatus.ERROR_500)
        }
        const categorie = await this.categorieRepository.findOneBy(
            {idCategories : formationToUpdate.categories}
        )
        const utilisateur = await this.utilisateurRepository.findOneBy(
            {idUtilisateur : formationToUpdate.utilisateurs}
        )
        console.log("j'ai la date ", formationToUpdate.dateheureLimiteInscription)
        const formation = await  this.formationsRepository.findOneOrFail({
            where: {
                idFormations: formationToUpdate.idFormations
            },
        })
        formation.nom = formationToUpdate.nom
        formation.infos = formationToUpdate.infos
        formation.actif = formationToUpdate.actif
        console.log("j'ai la date ", formationToUpdate.dateheureLimiteInscription)
        formation.dateheureLimiteInscription = formationToUpdate.dateheureLimiteInscription
        console.log("j'ai la date questionnaire ", formationToUpdate.dateheureQuestionnaire)
        formation.dateheureQuestionnaire = formationToUpdate.dateheureQuestionnaire
        formation.categories = categorie
        formation.utilisateurs = utilisateur
        return await this.formationsRepository.update(formation.idFormations, formation)
            .catch((error) => {
                console.log("Problème concernant la mise a jour de la formation")
                throw new HttpException("Problème concernant la mise a jour de la formation", ErrorStatus.ERROR_404)
            })
    }
}