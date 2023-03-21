import {IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";
import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";
import { EnumUtilisateur } from "../../../utilisateurs/enumUtilisateur";
import {RolesDto} from "../roles/roles.dto";

export class NewutilisateursDto{
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
    NRN: string;

    @IsDefined()
    @IsString()
    @IsNotBlank({message: "Dto : le mot de passe ne doit pas être vide"})
    @Length(2,100,{message: "DTO : le mot de passe doit être composé de minimum 2 caractères"})
    password : string;

    @IsNotEmpty()
    @IsEnum(EnumUtilisateur)
    sexe: EnumUtilisateur;

    @IsDefined()
    @IsNumber()
    actif: number

    @IsDefined()
    role : RolesDto

}