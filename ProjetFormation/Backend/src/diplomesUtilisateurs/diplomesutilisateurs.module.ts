import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiplomesUtilisateursEntity } from "../shared/entities/diplomesutilisateurs.entity";
import { DiplomesutilisateursService } from "./diplomesutilisateurs.service";
import { DiplomesutilisateursController } from "./diplomesutilisateurs.controller";
import {DiplomesEntity} from "../shared/entities/diplomes.entity";
import {UtilisateursEntity} from "../shared/entities/utilisateurs.entity";
import {DiplomesService} from "../diplomes/diplomes.service";
import {UtilisateursService} from "../utilisateurs/utilisateurs.service";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([DiplomesUtilisateursEntity])],
  providers: [DiplomesutilisateursService],
  controllers: [DiplomesutilisateursController],
})
export class DiplomesutilisateursModule {}