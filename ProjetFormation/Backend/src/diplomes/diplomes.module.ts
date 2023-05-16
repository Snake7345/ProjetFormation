import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiplomesEntity } from "../shared/entities/diplomes.entity";
import { DiplomesService } from "./diplomes.service";
import { DiplomesController } from "./diplomes.controller";
import {FormationsEntity} from "../shared/entities/formations.entity";
import {FormationsService} from "../formations/formations.service";
import { CategoriesEntity } from "../shared/entities/categories.entity";
import { UtilisateursEntity } from "../shared/entities/utilisateurs.entity";
import { CategoriesService } from "../categories/categories.service";
import { UtilisateursService } from "../utilisateurs/utilisateurs.service";
import { RolesService } from "../roles/roles.service";
import { RolesEntity } from "../shared/entities/roles.entity";
import {RolespermissionsEntity} from "../shared/entities/rolespermissions.entity";
import {RolespermissionsService} from "../rolesPermissions/rolespermissions.service";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([DiplomesEntity, CategoriesEntity, UtilisateursEntity, FormationsEntity, RolesEntity, RolespermissionsEntity])],
  providers: [DiplomesService, FormationsService, CategoriesService, UtilisateursService, RolesService, RolespermissionsService],
  controllers: [DiplomesController],
})
export class DiplomesModule {}