import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";

export class ProjetslaboDto {
  //@IsString()
  //@IsNotEmpty()
  @IsNotBlank({message : 'Serveur : le nom ne peut pas être vide'})
  nom?: string;
}
