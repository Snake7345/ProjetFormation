import { IsNumber } from "class-validator";

export class ReponsesIdDto{
  @IsNumber()
  idReponses : number

}