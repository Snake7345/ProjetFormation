import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReponsesEntity} from "../shared/entities/reponses.entity";
import {ReponsesService} from "./reponses.service";
import {ReponsesController} from "./reponses.controller";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature([ReponsesEntity])],
    providers: [ReponsesService],
    controllers: [ReponsesController],
})
export class ReponsesModule {}