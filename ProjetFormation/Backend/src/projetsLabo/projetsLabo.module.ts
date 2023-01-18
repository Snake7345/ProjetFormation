import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetsLaboEntity } from "./projetsLabo.entity";
import { ProjetsLaboController } from "./projetsLabo.controller";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([ProjetsLaboEntity])],
  providers: [ProjetsLaboEntity],
  controllers: [ProjetsLaboController],
})
export class AnneeslaboModule {}