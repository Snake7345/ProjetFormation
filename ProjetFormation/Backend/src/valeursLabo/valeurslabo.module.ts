import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValeurslaboEntity } from "./valeurslabo.entity";
import { ValeurslaboController } from "./valeurslabo.controller";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([ValeurslaboEntity])],
  providers: [ValeurslaboEntity],
  controllers: [ValeurslaboController],
})
export class ValeurslaboModule {}