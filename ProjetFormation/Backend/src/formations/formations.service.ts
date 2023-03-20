import {HttpException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FormationsEntity } from "../shared/entities/formations.entity";
import {FormationsDto} from "../shared/dto/formations/formations.dto";
import {ActivdesactivcategoriesDto} from "../shared/dto/categories/activdesactivcategories.dto";
import {ActivdesactivformationsDto} from "../shared/dto/formations/activdesactivformations.dto";

@Injectable()
export class FormationsService {
    constructor(
        @InjectRepository(FormationsEntity)
        private formationsRepository: Repository<FormationsEntity>,
    ) {
    }
    async getAll(): Promise<FormationsDto[]> {
        return this.formationsRepository.find(
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
            })
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
}