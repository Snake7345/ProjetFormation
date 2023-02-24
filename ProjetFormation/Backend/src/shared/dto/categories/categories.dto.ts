import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";
import {IsNumber, IsString, Length, MaxLength, MinLength} from "class-validator";
import {ErrorGeneral, ErrorTypeCategories} from "../../utilities/error.enum";

export class CategoriesDto {
  @IsNumber()
  idCategories : number
  @IsNotBlank({message : 'DTO : ' + ErrorGeneral.EMPTY_ERROR})
  @IsString({message : 'DTO : '+ ErrorTypeCategories.NOM_ERROR})
  @Length(2,100, {message : 'DTO : '+ ErrorTypeCategories.NOM_LENGTH})
  nom: string;

  @IsNumber()
  actif: number
}
