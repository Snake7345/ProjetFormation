import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from "../common/message.dto";
import { ProjetsLaboDto } from "./dto/projetsLabo.dto";
import { ProjetsLaboRepository } from "./projetsLabo.repository";
import { ProjetsLaboEntity } from "./projetsLabo.entity";
/*CRUD : le service sert a créer les méthodes qui seront utilisé partout ailleurs dans notre programme*/
@Injectable()
export class ProjetsLaboService {
  constructor(
    @InjectRepository(ProjetsLaboDto)
    private projetslaboRepository: ProjetsLaboRepository,
  ) {}

  async getAll(): Promise<ProjetsLaboEntity[]> {
    const list = await this.projetslaboRepository.find();
    if (!list.length) {
      throw new NotFoundException(
        new MessageDto('Serveur : La liste est vide'),
      );
    }
    return list;
  }

  async findById(idProjetsLabo: number): Promise<ProjetsLaboEntity> {
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

  async findByNom(nom: string): Promise<ProjetsLaboEntity> {
    const projet = await this.projetslaboRepository.findOneBy({ nom: nom });
    return projet ? projet: null;
  }

}