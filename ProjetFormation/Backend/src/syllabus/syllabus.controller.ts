import {Controller} from "@nestjs/common";
import {SyllabusService} from "./syllabus.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Syllabus")
@Controller('syllabus')
export class SyllabusController {
    constructor(private readonly syllabusService: SyllabusService) {
    }
}