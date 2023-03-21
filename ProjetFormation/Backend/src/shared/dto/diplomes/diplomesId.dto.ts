import { IsNumber } from "class-validator";

export class DiplomesIdDto {
  @IsNumber()
  idDiplomes: number
}