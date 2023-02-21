import {Controller, Get, Param, ParseIntPipe} from "@nestjs/common";
import {ValeurslaboService} from "./valeurslabo.service";

// On appelle les méthodes à partir du service
@Controller('valeurslabo')
export class ValeurslaboController {
  constructor(private readonly valeurslaboService: ValeurslaboService) {
  }

  @Get()
  async GetAll() {
    return await this.valeurslaboService.getAll();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number) {
    return await this.valeurslaboService.findById(id);
  }
}