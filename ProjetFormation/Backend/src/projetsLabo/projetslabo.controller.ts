import {Controller, Get, Param, ParseIntPipe} from "@nestjs/common";
import {ProjetslaboService} from "./projetslabo.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("ProjetsLabo")
// On appelle les méthodes à partir du service
@Controller('projetslabo')
export class ProjetslaboController {
  constructor(private readonly projetslaboService: ProjetslaboService) {
  }

  @Get()
  async GetAll() {
    return await this.projetslaboService.getAll();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number) {
    return await this.projetslaboService.findById(id);
  }

  @Get('annee/:id')
  async GetAllByAnnee(@Param('id', ParseIntPipe)id : number)
  {
    return await this.projetslaboService.findAllByAnnee(id)
  }


}