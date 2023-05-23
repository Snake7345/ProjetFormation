import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesEntity } from "../shared/entities/roles.entity";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { RolespermissionsEntity } from "../shared/entities/rolespermissions.entity";
import { RolespermissionsService } from "../rolesPermissions/rolespermissions.service";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([RolesEntity, RolespermissionsEntity])],
  providers: [RolesService, RolespermissionsService],
  controllers: [RolesController],
})
export class RolesModule {}