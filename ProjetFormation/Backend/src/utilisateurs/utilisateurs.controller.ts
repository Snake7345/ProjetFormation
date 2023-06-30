import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { UtilisateursService } from "./utilisateurs.service";
import { ApiTags } from "@nestjs/swagger";
import { UtilisateursDto } from "../shared/dto/utilisateurs/utilisateurs.dto";
import { NewutilisateursDto } from "../shared/dto/utilisateurs/newutilisateurs.dto";
import { UpdateutilisateursDto } from "../shared/dto/utilisateurs/updateutilisateurs.dto";
import { ActivdesactivutilisateursDto } from "../shared/dto/utilisateurs/activdesactivutilisateurs.dto";
import { ConnexionutilisateursDto } from "../shared/dto/utilisateurs/connexionutilisateurs.dto";
import {JwtAuthGuard} from "../jwt/guard/jwt-auth.guard";

@ApiTags("Utilisateurs")
@Controller('utilisateurs')

export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService,) {
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async GetAll() : Promise<UtilisateursDto[]> {
    return await this.utilisateursService.getAll();
  }

  @Get('role/:id')
  async GetAllByID(@Param('id', ParseIntPipe) id: number) : Promise<UtilisateursDto[]> {
    return await this.utilisateursService.getAllByID(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('readutilisateur/:id')
  async GetOne(@Param('id', ParseIntPipe) id: number) : Promise<UtilisateursDto> {
    return await this.utilisateursService.findById(id);
  }
  @Post('connexion')
  async connexion(@Body(ValidationPipe) invite: ConnexionutilisateursDto): Promise<{ utilisateur: UtilisateursDto; token: string }> {
    return await this.utilisateursService.connexionGetAll(invite);
  }


  @Post('createutilisateur')
  async createUtilisateurs(
      @Body(ValidationPipe) newUtilisateur: NewutilisateursDto
  ): Promise<any> {

    return await this.utilisateursService.createUtilisateurs(newUtilisateur)
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('modifier/:id')
  async update(
    @Body(ValidationPipe) updateUtilisateurs : UpdateutilisateursDto
  ) : Promise<UtilisateursDto> {
    return await this.utilisateursService.updateUtilisateurs(updateUtilisateurs);
  }

  @Patch('activdesactiv/:id')
  async activdesactiv(@Body(ValidationPipe) updateUtilisateurs : ActivdesactivutilisateursDto) : Promise<any> {
    return await this.utilisateursService.activDesactivUtilisateurs(updateUtilisateurs);
  }

}