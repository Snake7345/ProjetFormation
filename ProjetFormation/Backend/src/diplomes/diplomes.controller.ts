import {Controller, Get, Param, ParseIntPipe} from "@nestjs/common";

import { DiplomesService } from "./diplomes.service";
import { ApiTags } from "@nestjs/swagger";
import {DiplomesDto} from "../shared/dto/diplomes/diplomes.dto";

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