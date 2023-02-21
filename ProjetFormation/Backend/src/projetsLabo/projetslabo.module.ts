import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjetslaboEntity} from "./projetsLabo.entity";
import {ProjetslaboController} from "./projetsLabo.controller";
import {ProjetslaboService} from "./projetslabo.service";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([ProjetslaboEntity])],
  providers: [ProjetslaboService],
  controllers: [ProjetslaboController],
})
export class ProjetslaboModule {}