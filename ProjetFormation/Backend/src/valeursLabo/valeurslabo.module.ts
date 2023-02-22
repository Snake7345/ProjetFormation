import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ValeurslaboEntity} from "../shared/entities/valeurslabo.entity";
import {ValeurslaboController} from "./valeurslabo.controller";
import {ValeurslaboService} from "./valeurslabo.service";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([ValeurslaboEntity])],
  providers: [ValeurslaboService],
  controllers: [ValeurslaboController],
})
export class ValeurslaboModule {}