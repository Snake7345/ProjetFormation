import {Controller, Get, Param, ParseIntPipe} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { ApiTags } from "@nestjs/swagger";
import {QuestionsDto} from "../shared/dto/questions/questions.dto";

@ApiTags("Questions")
@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {
    }

    @Get()
    async GetAll() : Promise<QuestionsDto[]> {
        return await this.questionsService.getAll();
    }

    @Get('question/:id')
    async GetAllByID(@Param('id', ParseIntPipe) id: number) : Promise<QuestionsDto[]> {
        return await this.questionsService.getAllByID(id);
    }
}