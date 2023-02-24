import { IsNumber } from "class-validator";

export class SyllabusIdDto{
  @IsNumber()
  idSyllabus : number

}