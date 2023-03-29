import { IsDefined, IsString, Length } from "class-validator";
import { IsNotBlank } from "../../../decorators/is-not-blank.decorator";

export class ConnexionutilisateursDto
{
  @IsDefined()
  @IsString()
  @IsNotBlank({message: "Dto : le mail de l'utilisateur ne doit pas être vide"})
  mail: string;

  @IsDefined()
  @IsString()
  @IsNotBlank({message: "Dto : le mot de passe ne doit pas être vide"})
  @Length(2,100,{message: "DTO : le mot de passe doit être composé de minimum 2 caractères"})
  password : string;

}