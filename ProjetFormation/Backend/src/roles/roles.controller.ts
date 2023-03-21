import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { ApiTags } from "@nestjs/swagger";
import {RolesDto} from "../shared/dto/roles/roles.dto";
import {UpdaterolesDto} from "../shared/dto/roles/updateroles.dto";

@ApiTags("Roles")
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
  }

  @Get()
  async GetAll() : Promise<RolesDto[]> {
    return await this.rolesService.getAll();
  }
  @Get('readrole/:id')
  async GetOne(@Param('id', ParseIntPipe) id: number) : Promise<RolesDto> {
    return await this.rolesService.findById(id);
  }

  /*Je ne comprends pas la validation whitelist*/
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('createrole')
  async create(@Body(ValidationPipe) dto: RolesDto) : Promise<RolesDto> {
    return await this.rolesService.create(dto);
  }
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('modifierrole/:id')
  async update(
      @Body(ValidationPipe) updateRoles : UpdaterolesDto
  ) : Promise<RolesDto> {
    return await this.rolesService.update(updateRoles);
  }


}