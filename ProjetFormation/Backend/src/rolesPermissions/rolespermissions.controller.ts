import {Controller, Get} from "@nestjs/common";
import { RolespermissionsService } from "./rolespermissions.service";
import { ApiTags } from "@nestjs/swagger";
import {RolespermissionsDto} from "../shared/dto/rolespermissions/rolespermissions.dto";

@ApiTags("RolesPermissions")
@Controller('rolespermissions')
export class RolespermissionsController {
    constructor(private readonly rolespermissionsService: RolespermissionsService) {
    }
    @Get()
    async GetAll() : Promise<RolespermissionsDto[]> {
        return await this.rolespermissionsService.getAll();
    }

}