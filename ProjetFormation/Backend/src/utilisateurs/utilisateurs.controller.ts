import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { UtilisateursService } from "./utilisateurs.service";
import { ApiTags } from "@nestjs/swagger";
import { UtilisateursDto } from "../shared/dto/utilisateurs/utilisateurs.dto";
import { NewutilisateursDto } from "../shared/dto/utilisateurs/newutilisateurs.dto";
import { UpdatecategoriesDto } from "../shared/dto/categories/updatecategories.dto";
import { CategoriesDto } from "../shared/dto/categories/categories.dto";
import { UpdateutilisateursDto } from "../shared/dto/utilisateurs/updateutilisateurs.dto";

@ApiTags("Utilisateurs")
@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {
  }

  @Get()
  async GetAll() : Promise<UtilisateursDto[]> {
    return await this.utilisateursService.getAll();
  }

  @Get('readutilisateur:id')
  async GetOne(@Param('id', ParseIntPipe) id: number) : Promise<UtilisateursDto> {
    return await this.utilisateursService.findById(id);
  }

  @Post('createutilisateur')
  createUtilisateurs(
    @Body(ValidationPipe) newUtilisateur : NewutilisateursDto
  ) : Promise<any>
  {
    return this.utilisateursService.createUtilisateurs(newUtilisateur)
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('modifier:id')
  async update(
    @Body(ValidationPipe) updateUtilisateurs : UpdateutilisateursDto
  ) : Promise<UtilisateursDto> {
    return await this.utilisateursService.updateUtilisateurs(updateUtilisateurs);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('activdesactiv:id')
  async activdesactiv(
    @Body(ValidationPipe) updateUtilisateurs : UpdateutilisateursDto
  ) : Promise<UtilisateursDto> {
    return await this.utilisateursService.activDesactivUtilisateurs(updateUtilisateurs);
  }

}