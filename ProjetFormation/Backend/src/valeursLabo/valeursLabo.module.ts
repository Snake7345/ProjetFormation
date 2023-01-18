import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValeursLaboEntity } from "./valeursLabo.entity";
import { ValeursLaboController } from "./valeursLabo.controller";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([ValeursLaboEntity])],
  providers: [ValeursLaboEntity],
  controllers: [ValeursLaboController],
})
export class AnneeslaboModule {}