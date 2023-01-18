import { IsNotBlank } from "../../decorators/is-not-blank.decorator";

export class ProjetsLaboDto {
  //@IsString()
  //@IsNotEmpty()
  @IsNotBlank({message : 'Serveur : le nom ne peut pas être vide'})
  nom?: string;
}
