import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SyllabusEntity } from "../shared/entities/syllabus.entity";
import { RolesEntity } from "../shared/entities/roles.entity";
import { RolesService } from "../roles/roles.service";
import { FormationsEntity } from "../shared/entities/formations.entity";
import { FormationsService } from "../formations/formations.service";
import { UtilisateursDto } from "../shared/dto/utilisateurs/utilisateurs.dto";
import { SyllabusDto } from "../shared/dto/syllabus/syllabus.dto";

@Injectable()
export class SyllabusService {
    constructor(
        @InjectRepository(SyllabusEntity)
        private syllabusRepository: Repository<SyllabusEntity>,
        @InjectRepository(FormationsEntity)
        private rolesRepository: Repository<FormationsEntity>,
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
                  actif:true,
                  chemin:true,
              }
          })).map(s => ({ ...s, formations: s.formations}))
    }
}