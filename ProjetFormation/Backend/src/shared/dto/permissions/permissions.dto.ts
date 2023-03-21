import { IsDefined, IsNumber, IsString, Length } from "class-validator";
import { IsNotBlank } from "../../../decorators/is-not-blank.decorator";
import { ErrorTypePermissions } from "../../utilities/error.enum";

export class PermissionsDto
{
  @IsNumber()
  idPermissions : number

  @IsDefined()
  @IsNotBlank({message :'DTO :' + ErrorTypePermissions.EMPTY_ACTION_ERROR})
  @IsString({message : 'DTO :' + ErrorTypePermissions.ACTION_ERROR})
  @Length(2,150,{message : 'DTO :' + ErrorTypePermissions.ACTION_LENGTH})
  action: string;

  @IsDefined()
  @IsNotBlank({message :'DTO :' + ErrorTypePermissions.EMPTY_TYPE_ERROR})
  @IsString({message : 'DTO :' + ErrorTypePermissions.TYPE_ERROR})
  @Length(2,150,{message : 'DTO :' + ErrorTypePermissions.TYPE_LENGTH})
  type: string;
}