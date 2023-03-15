import {Controller, Get} from "@nestjs/common";
import { FormationsService } from "./formations.service";
import { ApiTags } from "@nestjs/swagger";
import {UtilisateursDto} from "../shared/dto/utilisateurs/utilisateurs.dto";
import {FormationsDto} from "../shared/dto/formations/formations.dto";

@ApiTags("Formations")
@Controller('formations')
export class FormationsController {
    constructor(private readonly formationsService: FormationsService) {
    }
    @Get()
    async GetAll() : Promise<FormationsDto[]> {
        return await this.formationsService.getAll();
    }
}