import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Req, UnauthorizedException,
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
import {CustomJwtService} from "../jwt/customjwt.service";

@ApiTags("Utilisateurs")
@Controller('utilisateurs')

export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService, private readonly customJwtService: CustomJwtService) {
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async GetAll(@Req() request: Request): Promise<UtilisateursDto[]> {
    const authorizationHeader = request.headers['authorization'];
    const token = this.extractTokenFromHeader(authorizationHeader);

    try {
      const decodedToken = this.customJwtService.verifyToken(token);
      const userId = decodedToken.id;
      const userEmail = decodedToken.email;

      console.log('Token is valid');
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return await this.utilisateursService.getAll();
  }

  private extractTokenFromHeader(authorizationHeader: string | string[]): string {
    if (typeof authorizationHeader === 'string') {
      const tokenRegex = /Bearer\s+(.*)/;
      const match = authorizationHeader.match(tokenRegex);
      if (match && match.length > 1) {
        return match[1];
      }
    }

    throw new UnauthorizedException('Invalid authorization header');
  }

  @Get('role/:id')
  async GetAllByID(@Param('id', ParseIntPipe) id: number) : Promise<UtilisateursDto[]> {
    return await this.utilisateursService.getAllByID(id);
  }

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