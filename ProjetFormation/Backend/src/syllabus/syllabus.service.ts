import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SyllabusEntity} from "./syllabus.entity";

@Injectable()
export class SyllabusService {
    constructor(
        @InjectRepository(SyllabusEntity)
        private syllabusRepository: Repository<SyllabusEntity>,
    ) {
    }
}