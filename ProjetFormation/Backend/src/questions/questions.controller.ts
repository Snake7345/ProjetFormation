import { Controller } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Questions")
@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {
    }
}