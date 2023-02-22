import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {QuestionsEntity} from "../shared/entities/questions.entity";

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionsEntity)
        private questionsRepository: Repository<QuestionsEntity>,
    ) {
    }
}