import {Controller} from "@nestjs/common";
import {DiplomesutilisateursService} from "./diplomesutilisateurs.service";

@Controller('diplomesutilisateurs')
export class DiplomesutilisateursController {
  constructor(private readonly diplomeutilisateursService: DiplomesutilisateursService) {
  }
}