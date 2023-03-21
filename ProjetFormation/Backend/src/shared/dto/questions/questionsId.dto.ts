import { IsNumber } from "class-validator";

export class QuestionsIdDto {
  @IsNumber()
  idQuestions : number
}