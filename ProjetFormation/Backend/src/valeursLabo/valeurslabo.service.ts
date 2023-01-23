import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from "../common/message.dto";
import { ValeurslaboRepository } from "./valeurslabo.repository";
import { ValeurslaboEntity} from "./valeursLabo.entity";
import { ValeurslaboDto} from "./dto/valeurslabo.dto";
/*CRUD : le service sert a créer les méthodes qui seront utilisé partout ailleurs dans notre programme*/
@Injectable()
export class ValeurslaboService {
  constructor(
    @InjectRepository(ValeurslaboDto)
    private valeurslaboRepository: ValeurslaboRepository,
  ) {}

  async getAll(): Promise<ValeurslaboEntity[]> {
    const list = await this.valeurslaboRepository.find();
    if (!list.length) {
      throw new NotFoundException(
        new MessageDto('Serveur : La liste est vide'),
      );
    }
    return list;
  }

  async findById(idValeursLabo: number): Promise<ValeurslaboEntity> {
    const valeurs = await this.valeurslaboRepository.findOneBy({
      idValeursLabo,
    });
    if (!valeurs) {
      throw new NotFoundException(
        new MessageDto("Serveur : Cette valeur n'existe pas"),
      );
    }
    return valeurs;
  }

  async findByNom(valeur: number): Promise<ValeurslaboEntity> {
    const valeurs = await this.valeurslaboRepository.findOneBy({ valeur: valeur });
    return valeurs ? valeurs: null;
  }

}