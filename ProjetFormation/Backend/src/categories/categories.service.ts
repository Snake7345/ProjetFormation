import {BadRequestException, HttpException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoriesEntity} from "../shared/entities/categories.entity";
import {MessageDto} from "../common/message.dto";
import {CategoriesDto} from "../shared/dto/categories/categories.dto";
import {Repository} from "typeorm";
import {ErrorGeneral, ErrorStatus, ErrorTypeCategories} from "../shared/utilities/error.enum";
import {UpdatecategoriesDto} from "../shared/dto/categories/updatecategories.dto";
import {CategorieIdDto} from "../shared/dto/categories/categorieId.dto";

/*CRUD : le service sert à créer les méthodes qui seront utilisées partout ailleurs dans notre programme*/
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoriesRepository: Repository<CategoriesEntity>,
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

  async create(dto: CategoriesDto): Promise<CategoriesDto> {
    if (await this.findByNom(dto.nom)) {
      throw new HttpException(ErrorTypeCategories.NOM_EXIST,ErrorStatus.NOM_EXIST
      );
    }
    let categorie : CategoriesEntity = this.categoriesRepository.create(dto)

    return this.categoriesRepository.save(categorie)
        .catch(_ => {
          throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_UNKNOW)
        })
    console.log("La catégorie est créée")
  }

  async update(dto : UpdatecategoriesDto): Promise<UpdatecategoriesDto> {
    const categorie = await this.findById(dto.idCategories);
    const exists = await this.findByNom(dto.nom);
    if (!categorie) {
      throw new HttpException(ErrorTypeCategories.CATEGORIE_NOT_EXIST,ErrorStatus.CATEGORIE_NOT_EXIST
      );
    }
    if (exists && exists.idCategories !== dto.idCategories) {
      throw new HttpException(ErrorTypeCategories.CATEGORIE_EXIST,ErrorStatus.CATEGORIE_EXIST
      );
    }
    return await this.categoriesRepository.save(dto)
      .catch(_ => {
        throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_UNKNOW)
      })
    console.log("La catégorie est modifié")
  }

  async delete(dtoId: CategorieIdDto): Promise<UpdatecategoriesDto> {
    if(!await this.findById(dtoId.idCategories))
    {
      throw new HttpException(ErrorTypeCategories.CATEGORIE_NOT_EXIST,ErrorStatus.CATEGORIE_NOT_EXIST
      );
    }
    let categorieToDelete = this.categoriesRepository.create({idCategories : dtoId.idCategories})
    return this.categoriesRepository.softRemove(categorieToDelete)
        .then((res) => {
          return res
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
          throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_UNKNOW)
        })
    console.log("La catégorie est supprimés")
  }
}
