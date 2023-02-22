import {IsNotBlank} from "../../../decorators/is-not-blank.decorator";

export class ValeurslaboDto {
  //@IsString()
  //@IsNotEmpty()
  @IsNotBlank({message : 'Serveur : le nom ne peut pas être vide'})
  valeur?: number;
}
