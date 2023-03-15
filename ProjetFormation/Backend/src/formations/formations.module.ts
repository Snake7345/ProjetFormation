import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FormationsEntity } from "../shared/entities/formations.entity";
import { FormationsService } from "./formations.service";
import { FormationsController } from "./formations.controller";
import {CategoriesEntity} from "../shared/entities/categories.entity";
import {UtilisateursEntity} from "../shared/entities/utilisateurs.entity";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature([FormationsEntity, CategoriesEntity, UtilisateursEntity])],
    providers: [FormationsService],
    controllers: [FormationsController],
})
export class FormationsModule {}