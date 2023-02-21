import { Controller } from "@nestjs/common";

import { DiplomesService } from "./diplomes.service";

@Controller('diplomes')
export class DiplomesController {
  constructor(private readonly diplomesService: DiplomesService) {
  }
}