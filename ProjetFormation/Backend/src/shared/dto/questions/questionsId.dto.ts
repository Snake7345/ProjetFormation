import { IsDefined, IsNumber } from "class-validator";

export class QuestionsIdDto {
  @IsDefined()
  @IsNumber()
  idQuestions : number
}