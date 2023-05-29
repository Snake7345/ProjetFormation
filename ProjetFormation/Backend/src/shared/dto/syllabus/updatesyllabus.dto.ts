import {IsDefined, IsNumber, IsString} from "class-validator";
import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";
import {FormationsDto} from "../formations/formations.dto";

export class UpdatesyllabusDto{
    @IsNumber()
    idSyllabus : number
    @IsDefined()
    @IsString()
    @IsNotBlank({message: "Dto : Le nom du syllabus ne peut pas être vide"})
    nom : string
    @IsDefined()
    @IsString()
    @IsNotBlank({message: "Dto : le chemin du syllabys ne peut pas être vide"})
    chemin : string

    @IsDefined()
    @IsNumber()
    actif: number

    @IsDefined()
    formation : FormationsDto
}