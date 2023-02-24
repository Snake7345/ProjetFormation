import { IsNumber } from "class-validator";

export class FormationsIdDto{
@IsNumber()
  idFormations : number
}