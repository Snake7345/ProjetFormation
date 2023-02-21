import { Controller } from "@nestjs/common";
import { CategoriesService } from "../categories/categories.service";
import { DiplomesutilisateursService } from "./diplomesutilisateurs.service";

@Controller('diplomesutilisateurs')
export class DiplomesutilisateursController {
  constructor(private readonly diplomeutilisateursService: DiplomesutilisateursService) {
  }
}