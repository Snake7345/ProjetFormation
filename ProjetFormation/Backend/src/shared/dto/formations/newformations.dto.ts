import { IsDate, IsDefined, IsNumber, IsString, Length, MaxLength } from "class-validator";
import { IsNotBlank } from "../../../decorators/is-not-blank.decorator";
import { ErrorTypeFormations } from "../../utilities/error.enum";
import {CategoriesDto} from "../categories/categories.dto";
import {UtilisateursDto} from "../utilisateurs/utilisateurs.dto";

export class NewformationsDto{

    idFormations : number

    @IsNotBlank({message : 'DTO : ' + ErrorTypeFormations.EMPTY_NOM_ERROR})
    @IsString({message : 'DTO : '+ ErrorTypeFormations.NOM_ERROR})
    @Length(2,150, {message : 'DTO : '+ ErrorTypeFormations.NOM_LENGTH})
    nom: string;

    @MaxLength(1000, {message : 'DTO : '+ ErrorTypeFormations.INFOS_LENGTH})
    infos: string;

    @IsNumber()
    actif: number

    @IsNotBlank({message : 'DTO : ' + ErrorTypeFormations.EMPTY_DATE_INSCRIPTION_LIMIT_ERROR})
    //@IsDate({message : 'DTO : ' + ErrorTypeFormations.DATE_INSCRIPTION_LIMIT_ERROR})
    dateLimiteInscription : Date

    @IsNotBlank({message : 'DTO : ' + ErrorTypeFormations.EMPTY_HEURE_LIMIT_INSCRIPTION_ERROR})
    //@IsDate({message : 'DTO : ' + ErrorTypeFormations.HEURE_INSCRIPTION_LIMIT_ERROR})
    heureLimiteInscription : Date
    @IsNotBlank({message : 'DTO : ' + ErrorTypeFormations.EMPTY_DATE_QUESTIONNAIRE_ERROR})
    //@IsDate({message : 'DTO : ' + ErrorTypeFormations.DATE_QUESTIONNAIRE_ERROR})
    dateQuestionnaire : Date
    @IsNotBlank({message : 'DTO : ' + ErrorTypeFormations.EMPTY_HEURE_QUESTIONNAIRE_ERROR})
    //@IsDate({message : 'DTO : ' + ErrorTypeFormations.HEURE_QUESTIONNAIRE_ERROR})
    heureQuestionnaire : Date

    @IsDefined()
    categories : CategoriesDto

    @IsDefined()
    utilisateurs : UtilisateursDto

}