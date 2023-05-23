import { IsDefined, IsNumber, IsString, Length } from "class-validator";
import { IsNotBlank } from "../../../decorators/is-not-blank.decorator";
import { ErrorTypePermissions, ErrorTypeQuestions } from "../../utilities/error.enum";
import { FormationsDto } from "../formations/formations.dto";

export class QuestionsDto{
  @IsNumber()
  idQuestions: number

  @IsDefined()
  @IsNotBlank()
  @IsString()
  @Length(4,250,{})
  question: string;

  @IsDefined()
  @IsNotBlank({message :'DTO :' + ErrorTypeQuestions.QUESTION_COTE_EMPTY_ERROR})
  @IsNumber()
  cote: number;

  @IsDefined()
  @IsNotBlank()
  @IsNumber()
  actif : number

  @IsDefined()
  formations : FormationsDto
}