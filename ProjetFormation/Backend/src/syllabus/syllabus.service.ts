import {HttpException, Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SyllabusEntity } from "../shared/entities/syllabus.entity";
import { FormationsEntity } from "../shared/entities/formations.entity";
import { FormationsService } from "../formations/formations.service";
import { SyllabusDto } from "../shared/dto/syllabus/syllabus.dto";
import {ErrorStatus, ErrorTypeSyllabus,} from "../shared/utilities/error.enum";
import {ActivdesactivsyllabusDto} from "../shared/dto/syllabus/activdesactivsyllabus.dto";

@Injectable()
export class SyllabusService {
    constructor(
        @InjectRepository(SyllabusEntity)
        private syllabusRepository: Repository<SyllabusEntity>,
        @InjectRepository(FormationsEntity)
        private formationRepository: Repository<FormationsEntity>,
        private readonly formationService : FormationsService
    )
    {}
    async getAll(): Promise<SyllabusDto[]> {
        return (await this.syllabusRepository.find(
          {
              relations : {formations : true},
              select : {
                  idSyllabus : true,
                  nom:true,
                  chemin:true,
                  actif:true,
              }
          })).map(s => ({ ...s, formation: s.formations}))
    }

    async findById(id: number): Promise<SyllabusDto> {
        try {
            const syllabus = await this.syllabusRepository.findOneOrFail({
                relations : {formations:true},
                where : {idSyllabus : id}
            });
            return {...syllabus, formation: syllabus.formations}
        }
        catch(error) {
            throw new HttpException(ErrorTypeSyllabus.SYLLABUS_NOT_EXIST, ErrorStatus.ERROR_404)
        }
    }

    async activDesactivSyllabus(updateSyllabus : ActivdesactivsyllabusDto) : Promise<any>
    {
        const syl = await  this.syllabusRepository.findOneOrFail({
            where: {
                idSyllabus: updateSyllabus.idSyllabus
            },
        })
        syl.actif = updateSyllabus.actif
        return await this.syllabusRepository.update(syl.idSyllabus, syl)
            .catch((error) => {
                throw new HttpException(ErrorTypeSyllabus.SYLLABUS_PROBLEM, ErrorStatus.ERROR_500)
            })
    }

    async getSyllabusByFormationId(formationId: number): Promise<SyllabusDto[]> {
        const formation = await this.formationRepository.findOne({
            relations: ['syllabus'],
            where: { idFormations: formationId },
        });

        if (!formation) {
            throw new Error(`Formation with ID ${formationId} not found.`);
        }

        return formation.syllabus.map(syllabus => ({
            idSyllabus: syllabus.idSyllabus,
            nom: syllabus.nom,
            chemin: syllabus.chemin,
            formation: formation,
            actif : syllabus.actif,
        }));
    }

}