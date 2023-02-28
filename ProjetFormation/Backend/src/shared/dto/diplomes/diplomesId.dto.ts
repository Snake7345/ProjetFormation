import { IsDefined, IsNumber } from "class-validator";

export class DiplomesIdDto {
  @IsDefined()
  @IsNumber()
  idDiplomes: number
}