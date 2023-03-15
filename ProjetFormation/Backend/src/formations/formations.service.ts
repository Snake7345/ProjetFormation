import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FormationsEntity } from "../shared/entities/formations.entity";
import {FormationsDto} from "../shared/dto/formations/formations.dto";

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
}