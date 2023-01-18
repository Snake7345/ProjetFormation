import { IsNotBlank } from "../../decorators/is-not-blank.decorator";

export class ValeursLaboDto {
  //@IsString()
  //@IsNotEmpty()
  @IsNotBlank({message : 'Serveur : le nom ne peut pas être vide'})
  valeur?: number;
}
