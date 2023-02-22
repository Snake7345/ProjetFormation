import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ReponsesEntity} from "./reponses.entity";

@Injectable()
export class ReponsesService {
    constructor(
        @InjectRepository(ReponsesEntity)
        private reponsesRepository: Repository<ReponsesEntity>,
    ) {
    }
}