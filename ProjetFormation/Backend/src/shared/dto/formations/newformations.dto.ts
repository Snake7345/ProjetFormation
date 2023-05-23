import { IsDate, IsDateString, IsDefined, IsNumber, IsString, Length, MaxLength } from "class-validator";
import { IsNotBlank } from "../../../decorators/is-not-blank.decorator";
import { ErrorTypeFormations } from "../../utilities/error.enum";
import {CategoriesDto} from "../categories/categories.dto";
import {UtilisateursDto} from "../utilisateurs/utilisateurs.dto";

export class NewformationsDto{

    idFormations : number

    @IsNotBlank({message : 'DTO : ' + ErrorTypeFormations. FORMATION_EMPTY_NOM_ERROR})
    @IsString({message : 'DTO : '+ ErrorTypeFormations. FORMATION_NOM_ERROR})
    @Length(2,150, {message : 'DTO : '+ ErrorTypeFormations. FORMATION_NOM_LENGTH})
    nom: string;

    @MaxLength(1000, {message : 'DTO : '+ ErrorTypeFormations. FORMATION_INFOS_LENGTH})
    infos: string;

    @IsNumber()
    actif: number

    @IsNotBlank({message : 'DTO : ' + ErrorTypeFormations. FORMATION_EMPTY_DATE_INSCRIPTION_LIMIT_ERROR})
    //@IsDate({message : 'DTO : ' + ErrorTypeFormations.DATE_INSCRIPTION_LIMIT_ERROR})
    dateheureLimiteInscription : Date

    @IsNotBlank({message : 'DTO : ' + ErrorTypeFormations. FORMATION_EMPTY_DATE_QUESTIONNAIRE_ERROR})
    //@IsDate({message : 'DTO : ' + ErrorTypeFormations.DATE_QUESTIONNAIRE_ERROR})
    dateheureQuestionnaire : Date

    @IsDefined()
    categories : CategoriesDto

    @IsDefined()
    utilisateurs : UtilisateursDto

}