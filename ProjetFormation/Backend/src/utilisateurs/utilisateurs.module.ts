import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilisateursEntity } from "../shared/entities/utilisateurs.entity";
import { UtilisateursService } from "./utilisateurs.service";
import { UtilisateursController } from "./utilisateurs.controller";
import { RolesService } from "../roles/roles.service";
import { RolesEntity } from "../shared/entities/roles.entity";
import { RolespermissionsEntity } from "../shared/entities/rolespermissions.entity";
import { RolespermissionsService } from "../rolesPermissions/rolespermissions.service";
import {CustomJwtService} from "../jwt/customjwt.service";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([UtilisateursEntity, RolesEntity, RolespermissionsEntity,]),],
  providers: [UtilisateursService, RolesService, RolespermissionsService, CustomJwtService],
  controllers: [UtilisateursController],
})
export class UtilisateursModule {}