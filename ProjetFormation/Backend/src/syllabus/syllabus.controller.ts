import {Controller} from "@nestjs/common";
import {SyllabusService} from "./syllabus.service";

@Controller('syllabus')
export class SyllabusController {
    constructor(private readonly syllabusService: SyllabusService) {
    }
}