import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";

export class AnneeslaboDto {
  //@IsString()
  //@IsNotEmpty()
  @IsNotBlank({message : 'Serveur : le nom ne peut pas être vide'})
  annee?: number;
}
