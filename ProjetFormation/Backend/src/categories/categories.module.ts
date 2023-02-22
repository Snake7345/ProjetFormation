import {Module} from "@nestjs/common";
import {CategoriesService} from "./categories.service";
import {CategoriesController} from "./categories.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoriesEntity} from "../shared/entities/categories.entity";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
