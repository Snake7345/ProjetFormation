import {Controller} from "@nestjs/common";
import {UtilisateursService} from "./utilisateurs.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Utilisateurs")
@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {
  }
}