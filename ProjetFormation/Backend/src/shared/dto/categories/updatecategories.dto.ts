import { IsNotBlank } from "../../../decorators/is-not-blank.decorator";
import { ErrorTypeCategories } from "../../utilities/error.enum";
import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class UpdatecategoriesDto
{
    @IsNumber()
    idCategories : number
    @IsDefined()
    @IsNotBlank({message : 'DTO : ' + ErrorTypeCategories.CATEGORIE_EMPTY_NOM_ERROR})
    @IsString({message : 'DTO : '+ ErrorTypeCategories.CATEGORIE_NOM_ERROR})
    @Length(2,100, {message : 'DTO : '+ ErrorTypeCategories.CATEGORIE_NOM_LENGTH})
    nom: string;

    @IsDefined()
    @IsNumber()
    actif: number
}