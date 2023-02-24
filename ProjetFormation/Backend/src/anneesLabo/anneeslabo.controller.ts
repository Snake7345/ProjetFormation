import {Controller, Get, Param, ParseIntPipe} from "@nestjs/common";
import {AnneeslaboService} from "./anneeslabo.service";
import { ApiTags } from "@nestjs/swagger";

// On appelle les méthodes à partir du service
@ApiTags("Anneeslabo")
@Controller('anneeslabo')
export class AnneeslaboController {
  constructor(private readonly anneeslaboService: AnneeslaboService) {
  }

  @Get()
  async GetAll() {
    return await this.anneeslaboService.getAll();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number) {
    return await this.anneeslaboService.findById(id);
  }

}