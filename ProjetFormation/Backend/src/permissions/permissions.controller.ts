import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { ApiTags } from "@nestjs/swagger";
import {CategoriesDto} from "../shared/dto/categories/categories.dto";
import {NewcategoriesDto} from "../shared/dto/categories/newcategories.dto";
import {UpdatecategoriesDto} from "../shared/dto/categories/updatecategories.dto";
import {PermissionsDto} from "../shared/dto/permissions/permissions.dto";
import {NewpermissionsDto} from "../shared/dto/permissions/newpermissions.dto";
import {UpdatepermissionsDto} from "../shared/dto/permissions/updatepermissions.dto";

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