import { IsNotBlank } from "../../../decorators/is-not-blank.decorator";
import { ErrorTypeDiplomes } from "../../utilities/error.enum";
import { IsDefined, IsNumber, IsString, Length } from "class-validator";
import {FormationsDto} from "../formations/formations.dto";

export class DiplomesDto {
  @IsDefined()
  @IsNumber()
  idDiplomes : number
  @IsNotBlank({message : 'DTO : ' + ErrorTypeDiplomes.EMPTY_NOM_ERROR})
  @IsString({message : 'DTO : '+ ErrorTypeDiplomes.NOM_ERROR})
  @Length(2,150, {message : 'DTO : '+ ErrorTypeDiplomes.NOM_LENGTH})
  nom: string;

  @IsDefined()
  formation : FormationsDto

  // ATTENTION : Le diplome reçoit la formation
}
