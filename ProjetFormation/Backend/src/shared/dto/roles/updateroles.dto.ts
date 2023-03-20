import {IsDefined, IsNumber, IsString, Length} from "class-validator";
import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";

export class UpdaterolesDto{
    idRoles: number

    @IsString()
    @IsNotBlank({message: "Dto : la dénomination du rôle ne doit pas être vide"})
    @Length(2,70,{message: "DTO : La dénomination du rôle doit être entre 2 et 250 caractères"})
    denomination: string;

    @IsDefined()
    @IsNotBlank()
    @IsNumber()
    actif: number

}