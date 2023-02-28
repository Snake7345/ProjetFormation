import { Controller } from "@nestjs/common";
import { ReponsesService } from "./reponses.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Reponses")
@Controller('reponses')
export class ReponsesController {
    constructor(private readonly reponsesService: ReponsesService) {
    }
}