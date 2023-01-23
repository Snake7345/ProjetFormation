import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from "../common/message.dto";
import { ProjetslaboDto } from "./dto/projetslabo.dto";
import { ProjetslaboRepository} from "./projetsLabo.repository";
import { ProjetslaboEntity } from "./projetslabo.entity";
/*CRUD : le service sert a créer les méthodes qui seront utilisé partout ailleurs dans notre programme*/
@Injectable()
export class ProjetslaboService {
  constructor(
    @InjectRepository(ProjetslaboDto)
    private projetslaboRepository: ProjetslaboRepository,
  ) {}

  async getAll(): Promise<ProjetslaboEntity[]> {
    const list = await this.projetslaboRepository.find();
    if (!list.length) {
      throw new NotFoundException(
        new MessageDto('Serveur : La liste est vide'),
      );
    }
    return list;
  }

  async findById(idProjetsLabo: number): Promise<ProjetslaboEntity> {
    const annees = await this.projetslaboRepository.findOneBy({
      idProjetsLabo,
    });
    if (!annees) {
      throw new NotFoundException(
        new MessageDto("Serveur : Cette année n'existe pas"),
      );
    }
    return annees;
  }

  async findByNom(nom: string): Promise<ProjetslaboEntity> {
    const projet = await this.projetslaboRepository.findOneBy({ nom: nom });
    return projet ? projet: null;
  }

}