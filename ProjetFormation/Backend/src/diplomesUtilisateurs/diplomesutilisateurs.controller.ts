import {Controller} from "@nestjs/common";
import {DiplomesutilisateursService} from "./diplomesutilisateurs.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("DiplomesUtilisateurs")
@Controller('diplomesutilisateurs')
export class DiplomesutilisateursController {
  constructor(private readonly diplomeutilisateursService: DiplomesutilisateursService) {
  }
}