import { Body, Controller, Get, Param, ParseIntPipe, Patch, ValidationPipe } from "@nestjs/common";
import { SyllabusService } from "./syllabus.service";
import { ApiTags } from "@nestjs/swagger";
import {FormationsDto} from "../shared/dto/formations/formations.dto";
import {SyllabusDto} from "../shared/dto/syllabus/syllabus.dto";
import { ActivdesactivutilisateursDto } from "../shared/dto/utilisateurs/activdesactivutilisateurs.dto";
import { ActivdesactivsyllabusDto } from "../shared/dto/syllabus/activdesactivsyllabus.dto";

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

    @Patch('activdesactiv/:id')
    async activdesactiv(@Body(ValidationPipe) updateSyllabus : ActivdesactivsyllabusDto) : Promise<any> {
        return await this.syllabusService.activDesactivSyllabus(updateSyllabus);
    }
}