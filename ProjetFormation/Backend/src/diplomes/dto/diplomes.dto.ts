import { IsNotBlank } from "../../decorators/is-not-blank.decorator";

export class DiplomesDto {
  //@IsString()
  //@IsNotEmpty()
  @IsNotBlank({message : 'Serveur : Le nom du diplome ne peut pas être vide'})
  nom?: string;
}
