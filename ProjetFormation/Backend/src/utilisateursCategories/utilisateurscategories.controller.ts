import {Controller} from "@nestjs/common";
import {UtilisateurscategoriesService} from "./utilisateurscategories.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("UtilisateursCategories")
@Controller('utilisateurscategioriess')
export class UtilisateurscategoriesController {
    constructor(private readonly utilisateurscategoriesService: UtilisateurscategoriesService) {
    }
}