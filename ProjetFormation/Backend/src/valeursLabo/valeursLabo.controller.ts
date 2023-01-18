import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ValeursLaboService } from "./valeursLabo.service";
// On appelle les méthodes à partir du service
@Controller('projetslabo')
export class ValeursLaboController {
  constructor(private readonly valeurslaboService: ValeursLaboService) {
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