import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MessageDto} from "../common/message.dto";
import {ProjetslaboEntity} from "../shared/entities/projetslabo.entity";
import {Like, Repository} from "typeorm";

/*CRUD : le service sert a créer les méthodes qui seront utilisé partout ailleurs dans notre programme*/
@Injectable()
export class ProjetslaboService {
  constructor(
    @InjectRepository(ProjetslaboEntity)
    private projetslaboRepository: Repository<ProjetslaboEntity>,
  ) {}

  async getAll(): Promise<ProjetslaboEntity[]> {
    const list = await this.projetslaboRepository.find({
      relations: ['FK_idValeursLabo', 'FK_idAnneesLabo'],
      order: {
        FK_idValeursLabo: {
          valeur: "DESC"
        }
      }
    });
    if (!list.length) {
      throw new NotFoundException(
        new MessageDto('Server : list is empty'),
      );
    }
    console.log(list)
    return list;
  }

  async findAllByAnnee(annee : number): Promise<ProjetslaboEntity[]> {
    const list = await this.projetslaboRepository.find({
      relations: ['FK_idValeursLabo', 'FK_idAnneesLabo'],
      where:{
        FK_idAnneesLabo :Like(annee)
      },
      order: {
        FK_idValeursLabo:{
          valeur:"DESC"
        }
      }
    });
    if (!list.length) {
      throw new NotFoundException(
        new MessageDto('Server : list is empty'),
      );
    }
    console.log(list)
    return list;
 }


  async findById(idProjetsLabo: number): Promise<ProjetslaboEntity> {
    const projet = await this.projetslaboRepository.findOneBy({
      idProjetsLabo,
    });
    if (!projet) {
      throw new NotFoundException(
        new MessageDto("Serveur : Cette année n'existe pas"),
      );
    }
    return projet;
  }

  async findByNom(nom: string): Promise<ProjetslaboEntity> {
    const projet = await this.projetslaboRepository.findOneBy({ nom: nom });
    return projet ? projet: null;
  }



  }