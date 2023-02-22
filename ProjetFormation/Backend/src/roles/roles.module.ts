import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolesEntity} from "../shared/entities/roles.entity";
import {RolesService} from "./roles.service";
import {RolesController} from "./roles.controller";

@Module({
  /*Remplir toutes les entités dans les imports*/
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}