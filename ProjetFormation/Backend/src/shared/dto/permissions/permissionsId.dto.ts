import { IsNumber } from "class-validator";

export class PermissionsIdDto {
  @IsNumber()
  idPermissions : number

}