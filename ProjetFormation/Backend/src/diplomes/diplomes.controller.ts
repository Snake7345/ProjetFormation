import {Controller} from "@nestjs/common";

import {DiplomesService} from "./diplomes.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Diplomes")
@Controller('diplomes')
export class DiplomesController {
  constructor(private readonly diplomesService: DiplomesService) {
  }
}