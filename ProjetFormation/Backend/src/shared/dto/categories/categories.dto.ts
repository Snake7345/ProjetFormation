import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";
import {IsString, MaxLength, MinLength} from "class-validator";
import {ErrorGeneral, ErrorTypeCategories} from "../../utilities/error.enum";

export class CategoriesDto {
  @IsNotBlank(
      {message : 'DTO : ' + ErrorGeneral.EMPTY_ERROR}
  )
  @IsString(
      {message : 'DTO : '+ ErrorTypeCategories.NOM_ERROR}
  )
  @MinLength(2,
      {message : 'DTO : '+ ErrorTypeCategories.NOM_LENGTH}
  )
  @MaxLength(100,
      {message : 'DTO : '+ ErrorTypeCategories.NOM_LENGTH}
  )
  nom: string;
}
