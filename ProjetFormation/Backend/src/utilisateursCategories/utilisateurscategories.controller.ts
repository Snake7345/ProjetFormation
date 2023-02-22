import {Controller} from "@nestjs/common";
import {UtilisateurscategoriesService} from "./utilisateurscategories.service";

@Controller('utilisateurscategioriess')
export class UtilisateurscategoriesController {
    constructor(private readonly utilisateurscategoriesService: UtilisateurscategoriesService) {
    }
}