import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FormationsEntity } from "../shared/entities/formations.entity";
import { FormationsDto } from "../shared/dto/formations/formations.dto";
import { ActivdesactivformationsDto } from "../shared/dto/formations/activdesactivformations.dto";
import { UtilisateursEntity } from "../shared/entities/utilisateurs.entity";
import { CategoriesEntity } from "../shared/entities/categories.entity";
import { CategoriesService } from "../categories/categories.service";
import { UtilisateursService } from "../utilisateurs/utilisateurs.service";
import { UpdateformationsDto } from "../shared/dto/formations/updateformations.dto";
import { ErrorGeneral, ErrorStatus, ErrorTypeFormations, ErrorTypeUtilisateurs } from "../shared/utilities/error.enum";

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
            throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND, ErrorStatus.ERROR_404)
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
        return await this.formationsRepository.update(form.idFormations, form)
            .catch((error) => {
                throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_404)
            })
    }

    async createFormations(formationToCreate : FormationsDto) : Promise<any>
    {
        if(formationToCreate.dateheureQuestionnaire < formationToCreate.dateheureLimiteInscription)
        {
            throw new HttpException(ErrorTypeFormations.FORMATION_DATE_INSCRIPTION_AFTER_QUESTIONNAIRE_ERROR, ErrorStatus.ERROR_500)
        }
        const categorie = await this.categorieRepository.findOneBy(
            {idCategories : formationToCreate.categories.idCategories}
        )
        const utilisateur = await this.utilisateurRepository.findOneBy(
            {idUtilisateur : formationToCreate.utilisateurs.idUtilisateur}
        )
        let formation : FormationsEntity = this.formationsRepository.create({...formationToCreate, categories:categorie, utilisateurs:utilisateur});
        return this.formationsRepository.save(formation)
            .catch((error) => {
                throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_404)
            })
    }

    async updateFormations(formationToUpdate : UpdateformationsDto) : Promise<any>
    {
        if(formationToUpdate.dateheureQuestionnaire < formationToUpdate.dateheureLimiteInscription)
        {
            throw new HttpException(ErrorTypeFormations.FORMATION_DATE_INSCRIPTION_AFTER_QUESTIONNAIRE_ERROR, ErrorStatus.ERROR_500)
        }
        const categorie = await this.categorieRepository.findOneBy(
            {idCategories : formationToUpdate.categories}
        )
        const utilisateur = await this.utilisateurRepository.findOneBy(
            {idUtilisateur : formationToUpdate.utilisateurs}
        )
        const formation = await  this.formationsRepository.findOneOrFail({
            where: {
                idFormations: formationToUpdate.idFormations
            },
        })
        formation.nom = formationToUpdate.nom
        formation.infos = formationToUpdate.infos
        formation.actif = formationToUpdate.actif
        formation.dateheureLimiteInscription = formationToUpdate.dateheureLimiteInscription
        formation.dateheureQuestionnaire = formationToUpdate.dateheureQuestionnaire
        formation.categories = categorie
        formation.utilisateurs = utilisateur
        return await this.formationsRepository.update(formation.idFormations, formation)
            .catch((error) => {
                throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_404)
            })
    }
}