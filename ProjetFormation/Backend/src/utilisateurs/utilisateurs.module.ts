import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilisateursEntity } from "../shared/entities/utilisateurs.entity";
import { UtilisateursService } from "./utilisateurs.service";
import { UtilisateursController } from "./utilisateurs.controller";
import { RolesService } from "../roles/roles.service";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([UtilisateursEntity, RolesService])],
  providers: [UtilisateursService, RolesService],
  controllers: [UtilisateursController],
})
export class UtilisateursModule {}