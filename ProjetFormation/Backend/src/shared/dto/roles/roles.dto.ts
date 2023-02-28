import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class RolesDto{
  @IsDefined()
  @IsNumber()
  idReponses: number

  @IsString()
  @Length(2,250,{})
  reponse: string;

  @IsNumber()
  coteAttribue: string;

  // Rajouter l'id utilisateur et question
}