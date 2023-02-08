import { Controller, Get } from "@nestjs/common";
import { ProjetslaboService } from "../projetsLabo/projetslabo.service";
import { PayslaboService } from "./payslabo.service";

@Controller('payslabo')
export class PayslaboController {
  constructor(private readonly payslaboService: PayslaboService) {
  }

  @Get()
  async GetAll() {
    return await this.payslaboService.getAll();
  }
}