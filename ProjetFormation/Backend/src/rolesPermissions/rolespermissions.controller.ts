import {Controller} from "@nestjs/common";
import {RolespermissionsService} from "./rolespermissions.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("RolesPermissions")
@Controller('rolespermissions')
export class RolespermissionsController {
    constructor(private readonly rolespermissionsService: RolespermissionsService) {
    }
}