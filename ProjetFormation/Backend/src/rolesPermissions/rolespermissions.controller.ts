import {Controller} from "@nestjs/common";
import {RolespermissionsService} from "./rolespermissions.service";

@Controller('rolespermissions')
export class RolespermissionsController {
    constructor(private readonly rolespermissionsService: RolespermissionsService) {
    }
}