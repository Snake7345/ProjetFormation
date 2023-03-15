import {IsDefined, IsNumber, IsString, Length} from "class-validator";
import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";
import {ErrorTypeDiplomes} from "../../utilities/error.enum";

export class NewdiplomesDto {

    idDiplomes: number
    @IsNotBlank({message: 'DTO : ' + ErrorTypeDiplomes.EMPTY_NOM_ERROR})
    @IsString({message: 'DTO : ' + ErrorTypeDiplomes.NOM_ERROR})
    @Length(2, 150, {message: 'DTO : ' + ErrorTypeDiplomes.NOM_LENGTH})
    nom: string;
}

// ATTENTION : Le diplome reçoit la formation