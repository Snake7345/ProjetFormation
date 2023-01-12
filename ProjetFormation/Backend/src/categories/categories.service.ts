import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from './categories.entity';
import { CategoriesRepository } from './categories.repository';
import { MessageDto } from '../common/message.dto';
import { CategoriesDto } from './dto/categories.dto';
/*CRUD : le service sert a créer les méthodes qui seront utilisé partout ailleurs dans notre programme*/
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoriesRepository: CategoriesRepository,
  ) {}

  async getAll(): Promise<CategoriesEntity[]> {
    const list = await this.categoriesRepository.find();
    if (!list.length) {
      throw new NotFoundException(
        new MessageDto('Serveur : La liste est vide'),
      );
    }
    return list;
  }

  async findById(idCategories: number): Promise<CategoriesEntity> {
    const categorie = await this.categoriesRepository.findOneBy({
      idCategories,
    });
    if (!categorie) {
      throw new NotFoundException(
        new MessageDto("Serveur : Cette catégorie n'existe pas"),
      );
    }
    return categorie;
  }

  async findByNom(nom: string): Promise<CategoriesEntity> {
    const categorie = await this.categoriesRepository.findOneBy({ nom: nom });
    return categorie ? categorie : null;
  }
  async create(dto: CategoriesDto): Promise<any> {
    const exists = await this.findByNom(dto.nom);
    if (exists) {
      throw new BadRequestException(
        new MessageDto('Serveur : ce nom existe déjà'),
      );
    }
    const categorie = this.categoriesRepository.create(dto);
    await this.categoriesRepository.save(categorie);
    return new MessageDto('catégories créée');
  }

  async update(id: number, dto: CategoriesDto): Promise<any> {
    const categorie = await this.findById(id);
    const exists = await this.findByNom(dto.nom);
    if (!categorie) {
      throw new BadRequestException(
        new MessageDto("Serveur : cette catégorie n'existe pas"),
      );
    }
    if (exists && exists.idCategories !== id) {
      throw new BadRequestException(
        new MessageDto('Serveur 2:ce nom existe déjà'),
      );
    }
    dto.nom ? (categorie.nom = dto.nom) : (categorie.nom = categorie.nom);
    await this.categoriesRepository.save(categorie);
    return new MessageDto(`categorie ${categorie.nom} modifié`);
  }

  async delete(id: number): Promise<any> {
    const categorie = await this.findById(id);
    await this.categoriesRepository.delete(categorie);
    return new MessageDto(`categorie ${categorie.nom} dégagé`);
  }
}
