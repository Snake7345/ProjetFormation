import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnneeslaboDto } from "./dto/anneeslabo.dto";
import { AnneeslaboRepository } from "./anneeslabo.repository";
import { AnneeslaboEntity } from "./anneeslabo.entity";
import { MessageDto } from "../common/message.dto";
import { CategoriesEntity } from "../categories/categories.entity";
/*CRUD : le service sert a créer les méthodes qui seront utilisé partout ailleurs dans notre programme*/
@Injectable()
export class AnneeslaboService {
  constructor(
    @InjectRepository(AnneeslaboDto)
    private anneeslaboRepository: AnneeslaboRepository,
  ) {}

  async getAll(): Promise<AnneeslaboEntity[]> {
    const list = await this.anneeslaboRepository.find();
    if (!list.length) {
      throw new NotFoundException(
        new MessageDto('Serveur : La liste est vide'),
      );
    }
    return list;
  }

  async findById(idAnneesLabo: number): Promise<AnneeslaboEntity> {
    const annees = await this.anneeslaboRepository.findOneBy({
      idAnneesLabo,
    });
    if (!annees) {
      throw new NotFoundException(
        new MessageDto("Serveur : Cette année n'existe pas"),
      );
    }
    return annees;
  }

  async findByAnnee(annee: number): Promise<AnneeslaboEntity> {
    const annees = await this.anneeslaboRepository.findOneBy({ annee: annee });
    return annees ? annees: null;
  }

}
