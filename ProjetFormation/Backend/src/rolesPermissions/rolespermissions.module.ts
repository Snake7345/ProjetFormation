import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolespermissionsEntity} from "../shared/entities/rolespermissions.entity";
import {RolespermissionsService} from "./rolespermissions.service";
import {RolespermissionsController} from "./rolespermissions.controller";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature([RolespermissionsEntity])],
    providers: [RolespermissionsService],
    controllers: [RolespermissionsController],
})
export class RolespermissionsModule {}