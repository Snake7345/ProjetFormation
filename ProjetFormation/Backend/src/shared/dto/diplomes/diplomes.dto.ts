import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";
import { ErrorGeneral, ErrorTypeDiplomes, ErrorTypeFormations } from "../../utilities/error.enum";
import { IsNumber, IsString, Length } from "class-validator";

export class DiplomesDto {
  @IsNumber()
  idDiplomes : number
  @IsNotBlank({message : 'DTO : ' + ErrorTypeDiplomes.EMPTY_NOM_ERROR})
  @IsString({message : 'DTO : '+ ErrorTypeDiplomes.NOM_ERROR})
  @Length(2,150, {message : 'DTO : '+ ErrorTypeDiplomes.NOM_LENGTH})
  nom: string;

  // ATTENTION : Le diplome reçoit la formation
}
