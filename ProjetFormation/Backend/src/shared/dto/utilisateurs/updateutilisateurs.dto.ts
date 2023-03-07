import {IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";
import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";

export class UpdateutilisateursDto{
    @IsDefined()
    @IsNotBlank()
    @IsNumber()
    idUtilisateur: number

    @IsDefined()
    @IsString()
    @IsNotBlank({message: "Dto : le nom de l'utilisateur ne doit pas être vide"})
    @Length(2,100,{message: "DTO : Le nom de l'utilisateur doit être entre 2 et 100 caractères"})
    nom: string;

    @IsDefined()
    @IsString()
    @IsNotBlank({message: "Dto : le prenom de l'utilisateur ne doit pas être vide"})
    @Length(2,100,{message: "DTO : Le prenom de l'utilisateur doit être entre 2 et 100 caractères"})
    prenom: string;


    // Voir si un décorateur ismail existe
    @IsDefined()
    @IsString()
    @IsNotBlank({message: "Dto : le mail de l'utilisateur ne doit pas être vide"})
    @Length(2,100,{message: "DTO : Le mail de l'utilisateur doit être entre 2 et 100 caractères"})
    mail: string;

    @IsDefined()
    @IsString()
    @IsNotBlank({message: "Dto : le numéro de registre national ne doit pas être vide"})
    @Length(11,11,{message: "DTO : Le numéro de registre national doit comporter 11 caractères"})
    nrn: string;

    @IsEnum(EnumUtilisateur)
    @IsNotEmpty()
    sexe: EnumUtilisateur;

    @IsDefined()
    @IsNumber()
    actif: number

    @IsDefined()
    roleIdRoles : number

}