import { IsNotBlank } from "../../../decorators/is-not-blank.decorator";
import { ErrorTypeDiplomes } from "../../utilities/error.enum";
import { IsDefined, IsNumber, IsString, Length } from "class-validator";
import {FormationsDto} from "../formations/formations.dto";

export class UpdatediplomesDto {
  @IsNumber()
  idDiplomes : number

  @IsDefined()
  @IsNotBlank({message : 'DTO : ' + ErrorTypeDiplomes.DIPLOME_EMPTY_NOM_ERROR})
  @IsString({message : 'DTO : '+ ErrorTypeDiplomes.DIPLOME_NOM_ERROR})
  @Length(2,150, {message : 'DTO : '+ ErrorTypeDiplomes.DIPLOME_NOM_LENGTH})
  nom: string;

  @IsDefined()
  formation : FormationsDto

}