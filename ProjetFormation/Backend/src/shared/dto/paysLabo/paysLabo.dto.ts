import { IsNotBlank } from "../../../decorators/is-not-blank.decorator";

export class PayslaboDto {
  //@IsString()
  //@IsNotEmpty()
  @IsNotBlank({message : 'Serveur : le nom ne peut pas être vide'})
  denomination?: string;
}