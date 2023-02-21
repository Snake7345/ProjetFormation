import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SyllabusEntity} from "./syllabus.entity";
import {SyllabusService} from "./syllabus.service";
import {SyllabusController} from "./syllabus.controller";

@Module({
    /*Remplir toutes les entités dans les imports*/
    imports: [TypeOrmModule.forFeature([SyllabusEntity])],
    providers: [SyllabusService],
    controllers: [SyllabusController],
})
export class SyllabusModule {}