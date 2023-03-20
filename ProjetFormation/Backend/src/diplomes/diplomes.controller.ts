import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe} from "@nestjs/common";

import { DiplomesService } from "./diplomes.service";
import { ApiTags } from "@nestjs/swagger";
import {UtilisateursDto} from "../shared/dto/utilisateurs/utilisateurs.dto";
import {DiplomesDto} from "../shared/dto/diplomes/diplomes.dto";
import {NewutilisateursDto} from "../shared/dto/utilisateurs/newutilisateurs.dto";
import {UpdateutilisateursDto} from "../shared/dto/utilisateurs/updateutilisateurs.dto";
import {ActivdesactivutilisateursDto} from "../shared/dto/utilisateurs/activdesactivutilisateurs.dto";
import {NewdiplomesDto} from "../shared/dto/diplomes/newdiplomes.dto";
import {Updatediplomesdto} from "../shared/dto/diplomes/updatediplomesdto";

@ApiTags("Diplomes")
@Controller('diplomes')
export class DiplomesController {
  constructor(private readonly diplomesService: DiplomesService) {
  }

  @Get()
  async GetAll() : Promise<DiplomesDto[]> {
    return await this.diplomesService.getAll();
  }

  @Get('readdiplomes/:id')
  async GetOne(@Param('id', ParseIntPipe) id: number) : Promise<DiplomesDto> {
    return await this.diplomesService.findById(id);
  }

}