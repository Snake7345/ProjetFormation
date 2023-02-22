import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DiplomesUtilisateursEntity} from "../shared/entities/diplomesutilisateurs.entity";
import {DiplomesutilisateursService} from "./diplomesutilisateurs.service";
import {DiplomesutilisateursController} from "./diplomesutilisateurs.controller";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([DiplomesUtilisateursEntity])],
  providers: [DiplomesutilisateursService],
  controllers: [DiplomesutilisateursController],
})
export class CategoriesModule {}