import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PayslaboEntity} from "../shared/entities/payslabo.entity";
import {PayslaboService} from "./payslabo.service";
import {PayslaboController} from "./payslabo.controller";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([PayslaboEntity])],
  providers: [PayslaboService],
  controllers: [PayslaboController],
})
export class PayslaboModule {}