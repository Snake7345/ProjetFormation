import { IsDefined, IsString } from "class-validator";
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
  @IsNotBlank({message: "Dto : le mail de l'utilisateur ne doit pas être vide"})
  password : string;

}