import { IsNumber } from "class-validator";

export class DiplomesutilisateursIdDto {
  @IsNumber()
  idDiplomesUtilisateur : number
}