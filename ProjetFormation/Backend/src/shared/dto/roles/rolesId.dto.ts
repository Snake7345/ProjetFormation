import { IsNumber } from "class-validator";

export class RolesIdDto{
  @IsNumber()
  idRoles : number

}