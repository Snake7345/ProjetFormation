import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionsEntity} from "./questions.entity";
import {QuestionsService} from "./questions.service";
import {QuestionsController} from "./questions.controller";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature([QuestionsEntity])],
    providers: [QuestionsService],
    controllers: [QuestionsController],
})
export class QuestionsModule {}