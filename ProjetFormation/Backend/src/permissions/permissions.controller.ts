import {Controller, Get, Param, ParseIntPipe} from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { ApiTags } from "@nestjs/swagger";
import {PermissionsDto} from "../shared/dto/permissions/permissions.dto";

@ApiTags("Permissions")
@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {
    }
    @Get()
    async GetAll() : Promise<PermissionsDto[]> {
        return await this.permissionsService.getAll();
    }


    @Get('readpermission/:id')
    async GetOne(@Param('id', ParseIntPipe) id: number) : Promise<PermissionsDto> {
        return await this.permissionsService.findById(id);
    }
}