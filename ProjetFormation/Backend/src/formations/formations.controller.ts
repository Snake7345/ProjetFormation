import {Controller} from "@nestjs/common";
import {FormationsService} from "./formations.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Formations")
@Controller('formations')
export class FormationsController {
    constructor(private readonly formationsService: FormationsService) {
    }
}