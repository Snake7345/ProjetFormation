import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilisateursEntity } from "./utilisateurs.entity";
import { UtilisateursService } from "./utilisateurs.service";
import { UtilisateursController } from "./utilisateurs.controller";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([UtilisateursEntity])],
  providers: [UtilisateursService],
  controllers: [UtilisateursController],
})
export class UtilisateursModule {}