import {PickType} from "@nestjs/swagger";
import {CategoriesDto} from "./categories.dto";
import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";
import {ErrorGeneral, ErrorTypeCategories} from "../../utilities/error.enum";
import {IsNumber, IsString, Length, MaxLength, MinLength} from "class-validator";

export class UpdatecategoriesDto
{
    @IsNumber()
    idCategories : number

    @IsNotBlank({message : 'DTO : ' + ErrorGeneral.EMPTY_ERROR})
    @IsString({message : 'DTO : '+ ErrorTypeCategories.NOM_ERROR})
    @Length(2,100, {message : 'DTO : '+ ErrorTypeCategories.NOM_LENGTH})
    nom: string;

    @IsNumber()
    actif: number
}