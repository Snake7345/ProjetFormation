import {IsDefined, IsNumber, IsString, Length} from "class-validator";
import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";
import {ErrorTypePermissions} from "../../utilities/error.enum";
import { FormationsDto } from "../formations/formations.dto";

export class NewquestionsDto{
    idQuestions: number

    @IsDefined()
    @IsNotBlank()
    @IsString()
    @Length(4,250,{})
    question: string;

    @IsDefined()
    @IsNotBlank({message :'DTO :' + "La cote maximale de la question doit être mise"})
    @IsNumber()
    cote: number;

    @IsDefined()
    @IsNotBlank()
    @IsNumber()
    actif : number

    @IsDefined()
    formations : FormationsDto
}