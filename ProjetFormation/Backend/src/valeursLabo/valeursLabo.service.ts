import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from "../common/message.dto";
import { ValeursLaboRepository } from "./valeursLabo.repository";
import { ValeursLaboEntity } from "./valeursLabo.entity";
import { ValeursLaboDto } from "./dto/valeursLabo.dto";
/*CRUD : le service sert a créer les méthodes qui seront utilisé partout ailleurs dans notre programme*/
@Injectable()
export class ValeursLaboService {
  constructor(
    @InjectRepository(ValeursLaboDto)
    private valeurslaboRepository: ValeursLaboRepository,
  ) {}

  async getAll(): Promise<ValeursLaboEntity[]> {
    const list = await this.valeurslaboRepository.find();
    if (!list.length) {
      throw new NotFoundException(
        new MessageDto('Serveur : La liste est vide'),
      );
    }
    return list;
  }

  async findById(idValeursLabo: number): Promise<ValeursLaboEntity> {
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

  async findByNom(valeur: number): Promise<ValeursLaboEntity> {
    const valeurs = await this.valeurslaboRepository.findOneBy({ valeur: valeur });
    return valeurs ? valeurs: null;
  }

}