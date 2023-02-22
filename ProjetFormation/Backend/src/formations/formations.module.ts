import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FormationsEntity} from "../shared/entities/formations.entity";
import {FormationsService} from "./formations.service";
import {FormationsController} from "./formations.controller";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature([FormationsEntity])],
    providers: [FormationsService],
    controllers: [FormationsController],
})
export class FormationsModule {}