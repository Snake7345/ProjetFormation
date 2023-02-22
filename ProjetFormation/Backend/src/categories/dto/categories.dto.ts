import {IsNotBlank} from "../../decorators/is-not-blank.decorator";

export class CategoriesDto {
  //@IsString()
  //@IsNotEmpty()
  @IsNotBlank({message : 'Serveur : le nom ne peut pas être vide'})
  nom?: string;
}
