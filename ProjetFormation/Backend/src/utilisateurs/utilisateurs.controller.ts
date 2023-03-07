import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { UtilisateursService } from "./utilisateurs.service";
import { ApiTags } from "@nestjs/swagger";
import { UtilisateursDto } from "../shared/dto/utilisateurs/utilisateurs.dto";

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


}