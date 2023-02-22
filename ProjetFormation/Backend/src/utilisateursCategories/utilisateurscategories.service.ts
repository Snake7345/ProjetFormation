import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UtilisateurscategoriesEntity} from "./utilisateurscategories.entity";

@Injectable()
export class UtilisateurscategoriesService {
    constructor(
        @InjectRepository(UtilisateurscategoriesEntity)
        private diplomesRepository: Repository<UtilisateurscategoriesEntity>,
    ) {
    }
}