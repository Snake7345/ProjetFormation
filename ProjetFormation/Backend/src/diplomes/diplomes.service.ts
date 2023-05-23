import {HttpException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DiplomesEntity } from "../shared/entities/diplomes.entity";
import {FormationsEntity} from "../shared/entities/formations.entity";
import {FormationsService} from "../formations/formations.service";
import {DiplomesDto} from "../shared/dto/diplomes/diplomes.dto";
import { ErrorStatus } from "../shared/utilities/error.enum";

@Injectable()
export class DiplomesService {
  constructor(
    @InjectRepository(DiplomesEntity)
    private diplomesRepository: Repository<DiplomesEntity>,

    @InjectRepository(FormationsEntity)
    private formationsRepository: Repository<FormationsEntity>,

    private readonly formationsService : FormationsService

  ) {}

  async getAll(): Promise<DiplomesDto[]> {
    return (await this.diplomesRepository.find(
        {
          relations : {formation : true},
          select : {
            idDiplomes : true,
            nom : true,
          }
        })).map(d => ({ ...d, formation: d.formation}))
  }


  async findById(id: number): Promise<DiplomesDto> {
    try {
      const diplome = await this.diplomesRepository.findOneOrFail({
        relations : {formation : true},
        where : {idDiplomes : id}
      });
      return {...diplome, formation: diplome.formation}
    }
    catch(error) {
      throw new HttpException("le diplome n'existe pas", ErrorStatus.ERROR_404)
    }
  }

}