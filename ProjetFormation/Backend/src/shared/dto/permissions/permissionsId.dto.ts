import { IsDefined, IsNumber } from "class-validator";

export class PermissionsIdDto {
  @IsDefined()
  @IsNumber()
  idPermissions : number

}