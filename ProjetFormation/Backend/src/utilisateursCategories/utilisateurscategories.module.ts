import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilisateurscategoriesEntity } from "../shared/entities/utilisateurscategories.entity";
import { UtilisateurscategoriesService } from "./utilisateurscategories.service";
import { UtilisateurscategoriesController } from "./utilisateurscategories.controller";
import {UtilisateursEntity} from "../shared/entities/utilisateurs.entity";
import {CategoriesEntity} from "../shared/entities/categories.entity";
import {CategoriesService} from "../categories/categories.service";
import {UtilisateursService} from "../utilisateurs/utilisateurs.service";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature([UtilisateurscategoriesEntity, UtilisateursEntity, CategoriesEntity])],
    providers: [UtilisateurscategoriesService, CategoriesService, UtilisateursService],
    controllers: [UtilisateurscategoriesController],
})
export class UtilisateurscategoriesModule {}