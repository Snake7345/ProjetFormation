import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SyllabusEntity } from "../shared/entities/syllabus.entity";
import { SyllabusService } from "./syllabus.service";
import { SyllabusController } from "./syllabus.controller";
import { FormationsEntity } from "../shared/entities/formations.entity";
import { FormationsService } from "../formations/formations.service";
import { CategoriesEntity } from "../shared/entities/categories.entity";
import { UtilisateursEntity } from "../shared/entities/utilisateurs.entity";
import { CategoriesService } from "../categories/categories.service";
import { UtilisateursService } from "../utilisateurs/utilisateurs.service";
import { RolesEntity } from "../shared/entities/roles.entity";
import { RolesService } from "../roles/roles.service";
import { RolespermissionsEntity } from "../shared/entities/rolespermissions.entity";
import { RolespermissionsService } from "../rolesPermissions/rolespermissions.service";
import {CustomJwtService} from "../jwt/customjwt.service";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature(
      [SyllabusEntity, FormationsEntity, CategoriesEntity, UtilisateursEntity,RolesEntity, RolespermissionsEntity])],
    providers: [SyllabusService, FormationsService, CategoriesService, UtilisateursService, RolesService, RolespermissionsService, CustomJwtService],
    controllers: [SyllabusController],
})
export class SyllabusModule {}