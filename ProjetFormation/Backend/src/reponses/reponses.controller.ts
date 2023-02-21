import {Controller} from "@nestjs/common";
import {ReponsesService} from "./reponses.service";

@Controller('reponses')
export class ReponsesController {
    constructor(private readonly reponsesService: ReponsesService) {
    }
}