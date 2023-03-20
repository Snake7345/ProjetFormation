import {HttpException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DiplomesEntity } from "../shared/entities/diplomes.entity";
import {FormationsEntity} from "../shared/entities/formations.entity";
import {FormationsService} from "../formations/formations.service";
import {UtilisateursDto} from "../shared/dto/utilisateurs/utilisateurs.dto";
import {DiplomesDto} from "../shared/dto/diplomes/diplomes.dto";

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
      console.log("le diplome n'existe pas")
      throw new HttpException("le diplome n'existe pas", 404)
    }
  }

}