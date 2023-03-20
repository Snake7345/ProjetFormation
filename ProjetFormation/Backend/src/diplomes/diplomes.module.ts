import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiplomesEntity } from "../shared/entities/diplomes.entity";
import { DiplomesService } from "./diplomes.service";
import { DiplomesController } from "./diplomes.controller";
import {FormationsEntity} from "../shared/entities/formations.entity";
import {FormationsService} from "../formations/formations.service";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([DiplomesEntity, FormationsEntity])],
  providers: [DiplomesService, FormationsService],
  controllers: [DiplomesController],
})
export class DiplomesModule {}