import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UtilisateurscategoriesEntity } from "../shared/entities/utilisateurscategories.entity";

@Injectable()
export class UtilisateurscategoriesService {
    constructor(
        @InjectRepository(UtilisateurscategoriesEntity)
        private utilisateurscategoriesRepository: Repository<UtilisateurscategoriesEntity>,
    ) {
    }
}