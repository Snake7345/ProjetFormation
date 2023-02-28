import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnneeslaboEntity } from "../shared/entities/anneeslabo.entity";
import { AnneeslaboService } from "./anneeslabo.service";
import { AnneeslaboController } from "./anneeslabo.controller";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([AnneeslaboEntity])],
  providers: [AnneeslaboService],
  controllers: [AnneeslaboController],
})
export class AnneeslaboModule {}