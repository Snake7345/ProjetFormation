import { IsDefined, IsNumber, IsString, Length } from "class-validator";
import { UtilisateursDto } from "../utilisateurs/utilisateurs.dto";
import { QuestionsDto } from "../questions/questions.dto";

export class UpdatereponsesDto {
  @IsDefined()
  @IsNumber()
  idReponses: number

  @IsString()
  @Length(2,250,{})
  reponse: string;

  @IsNumber()
  coteAttribue: string;

  @IsDefined()
  utilisateur : UtilisateursDto

  @IsDefined()
  questions : QuestionsDto
}