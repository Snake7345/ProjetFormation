import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuestionsEntity } from "../shared/entities/questions.entity";
import {SyllabusDto} from "../shared/dto/syllabus/syllabus.dto";
import {QuestionsDto} from "../shared/dto/questions/questions.dto";
import {UtilisateursDto} from "../shared/dto/utilisateurs/utilisateurs.dto";

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionsEntity)
        private questionsRepository: Repository<QuestionsEntity>,
    ) {
    }

    async getAll(): Promise<QuestionsDto[]> {
        return (await this.questionsRepository.find(
            {
                relations : {formations : true},
                select : {
                    idQuestions : true,
                    question:true,
                    cote:true,
                    actif:true,
                }
            })).map(q => ({ ...q, formation: q.question}))
    }

    async getAllByID(id:number): Promise<QuestionsDto[]> {
        return (await this.questionsRepository.find(
            {
                relations : {formations : true},
                select : {
                    idQuestions : true,
                    question:true,
                    cote:true,
                    actif:true,
                },
                where: {
                    formations: {
                        idFormations: id,
                    },
                },
            })).map(q => ({ ...q, formation: q.formations}))
    }
}