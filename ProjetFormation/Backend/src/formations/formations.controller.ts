import {Body, Controller, Get, Patch, ValidationPipe} from "@nestjs/common";
import { FormationsService } from "./formations.service";
import { ApiTags } from "@nestjs/swagger";
import {UtilisateursDto} from "../shared/dto/utilisateurs/utilisateurs.dto";
import {FormationsDto} from "../shared/dto/formations/formations.dto";
import {ActivdesactivcategoriesDto} from "../shared/dto/categories/activdesactivcategories.dto";
import {ActivdesactivformationsDto} from "../shared/dto/formations/activdesactivformations.dto";

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
}