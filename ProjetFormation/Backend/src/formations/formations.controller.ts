import {Controller} from "@nestjs/common";
import {FormationsService} from "./formations.service";

@Controller('formations')
export class FormationsController {
    constructor(private readonly formationsService: FormationsService) {
    }
}