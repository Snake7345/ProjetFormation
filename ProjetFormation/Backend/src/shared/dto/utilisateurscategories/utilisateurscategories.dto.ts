import {CategoriesDto} from "../categories/categories.dto";
import {UtilisateursDto} from "../utilisateurs/utilisateurs.dto";

export class UtilisateurscategoriesDto
{
    idUtilisateursCategories : number
    categories : CategoriesDto
    utilisateurs : UtilisateursDto
}