import { IsDefined, IsNumber } from "class-validator";

export class ActivdesactivsyllabusDto {
  @IsNumber()
  idSyllabus: number
  @IsDefined()
  @IsNumber()
  actif : number
}