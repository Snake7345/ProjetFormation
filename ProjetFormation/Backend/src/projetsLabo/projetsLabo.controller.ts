import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjetsLaboService } from "./projetsLabo.service";
// On appelle les méthodes à partir du service
@Controller('projetslabo')
export class ProjetsLaboController {
  constructor(private readonly projetslaboService: ProjetsLaboService) {
  }

  @Get()
  async GetAll() {
    return await this.projetslaboService.getAll();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number) {
    return await this.projetslaboService.findById(id);
  }
}