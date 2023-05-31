import {Controller, Get, Param, ParseIntPipe} from "@nestjs/common";
import { SyllabusService } from "./syllabus.service";
import { ApiTags } from "@nestjs/swagger";
import {FormationsDto} from "../shared/dto/formations/formations.dto";
import {SyllabusDto} from "../shared/dto/syllabus/syllabus.dto";

@ApiTags("Syllabus")
@Controller('syllabus')
export class SyllabusController {
    constructor(private readonly syllabusService: SyllabusService) {
    }

    @Get()
    async GetAll() : Promise<SyllabusDto[]> {
        return await this.syllabusService.getAll();
    }

    @Get('readsyllabus/:id')
    async GetOneSyllabus(@Param('id', ParseIntPipe) id: number) : Promise<SyllabusDto> {
        return await this.syllabusService.findById(id);
    }

    @Get('readsyllabusbyformations/:id')
    async getAllSyllabusByFormation(@Param('id', ParseIntPipe) id: number) : Promise<SyllabusDto[]> {
        return await this.syllabusService.getSyllabusByFormationId(id);
    }
}