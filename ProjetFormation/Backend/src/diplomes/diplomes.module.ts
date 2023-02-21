import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiplomesEntity } from "./diplomes.entity";
import { DiplomesService } from "./diplomes.service";
import { DiplomesController } from "./diplomes.controller";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([DiplomesEntity])],
  providers: [DiplomesService],
  controllers: [DiplomesController],
})
export class CategoriesModule {}