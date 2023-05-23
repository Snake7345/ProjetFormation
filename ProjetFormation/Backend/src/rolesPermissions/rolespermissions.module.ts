import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolespermissionsEntity } from "../shared/entities/rolespermissions.entity";
import { RolespermissionsService } from "./rolespermissions.service";
import { RolespermissionsController } from "./rolespermissions.controller";
import { RolesEntity } from "../shared/entities/roles.entity";
import { PermissionsEntity } from "../shared/entities/permissions.entity";
import { RolesService } from "../roles/roles.service";
import { PermissionsService } from "../permissions/permissions.service";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature([RolespermissionsEntity, RolesEntity, PermissionsEntity])],
    providers: [RolespermissionsService, RolesService, PermissionsService],
    controllers: [RolespermissionsController],
})
export class RolespermissionsModule {}