import { IsNumber } from "class-validator";

export class UtilisateursIdDto{
  @IsNumber()
  idUtilisateurs : number
}