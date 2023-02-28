import { Controller, Get } from "@nestjs/common";
import { PayslaboService } from "./payslabo.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Payslabo")
@Controller('payslabo')
export class PayslaboController {
  constructor(private readonly payslaboService: PayslaboService) {
  }

  @Get()
  async GetAll() {
    return await this.payslaboService.getAll();
  }
}