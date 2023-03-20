import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import { FormationsService } from "./formations.service";
import { ApiTags } from "@nestjs/swagger";
import {UtilisateursDto} from "../shared/dto/utilisateurs/utilisateurs.dto";
import {FormationsDto} from "../shared/dto/formations/formations.dto";
import {ActivdesactivcategoriesDto} from "../shared/dto/categories/activdesactivcategories.dto";
import {ActivdesactivformationsDto} from "../shared/dto/formations/activdesactivformations.dto";
import {NewutilisateursDto} from "../shared/dto/utilisateurs/newutilisateurs.dto";
import {NewformationsDto} from "../shared/dto/formations/newformations.dto";
import {UpdatecategoriesDto} from "../shared/dto/categories/updatecategories.dto";
import {CategoriesDto} from "../shared/dto/categories/categories.dto";
import {UpdateformationsDto} from "../shared/dto/formations/updateformations.dto";

@ApiTags("Formations")
@Controller('formations')
export class FormationsController {
    constructor(private readonly formationsService: FormationsService) {
    }
    @Get()
    async GetAll() : Promise<FormationsDto[]> {
        return await this.formationsService.getAll();
    }

    @Patch('activdesactiv/:id')
    async activdesactiv(@Body(ValidationPipe) updateFormations : ActivdesactivformationsDto) : Promise<any> {
        console.log("je suis un id et un actif : ", updateFormations.idFormations, " ", updateFormations.actif)
        return await this.formationsService.activDesactivFormations(updateFormations);
    }

    @Get('readformation/:id')
    async GetOne(@Param('id', ParseIntPipe) id: number) : Promise<FormationsDto> {
        return await this.formationsService.findById(id);
    }

    @Post('createformation')
    createFormations(
        @Body(ValidationPipe) newFormations : NewformationsDto
    ) : Promise<any>
    {
        return this.formationsService.createFormations(newFormations)
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Patch('modifier/:id')
    async update(
        @Body(ValidationPipe) updateFormation : UpdateformationsDto
    ) : Promise<FormationsDto> {
        return await this.formationsService.updateFormations(updateFormation);
    }

}