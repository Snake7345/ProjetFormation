import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionsEntity } from "../shared/entities/permissions.entity";
import { PermissionsService } from "./permissions.service";
import { PermissionsController } from "./permissions.controller";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature([PermissionsEntity])],
    providers: [PermissionsService],
    controllers: [PermissionsController],
})
export class PermissionsModule {}