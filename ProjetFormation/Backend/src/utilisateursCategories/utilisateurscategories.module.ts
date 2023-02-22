import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UtilisateurscategoriesEntity} from "../shared/entities/utilisateurscategories.entity";
import {UtilisateurscategoriesService} from "./utilisateurscategories.service";
import {UtilisateurscategoriesController} from "./utilisateurscategories.controller";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature([UtilisateurscategoriesEntity])],
    providers: [UtilisateurscategoriesService],
    controllers: [UtilisateurscategoriesController],
})
export class UtilisateurscategoriesModule {}