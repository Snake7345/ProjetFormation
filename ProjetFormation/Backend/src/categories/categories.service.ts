import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriesEntity } from "../shared/entities/categories.entity";
import { CategoriesDto } from "../shared/dto/categories/categories.dto";
import { Repository } from "typeorm";
import { ErrorGeneral, ErrorStatus, ErrorTypeCategories } from "../shared/utilities/error.enum";
import { UpdatecategoriesDto } from "../shared/dto/categories/updatecategories.dto";
import { CategorieIdDto } from "../shared/dto/categories/categorieId.dto";
import {NewcategoriesDto} from "../shared/dto/categories/newcategories.dto";

/*CRUD : le service sert à créer les méthodes qui seront utilisées partout ailleurs dans notre programme*/
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async getAll(): Promise<CategoriesDto[]> {
    return this.categoriesRepository.find({
      select : {
        idCategories : true,
        nom : true,
        actif : true
      }
    })
  }

  async findById(id: number): Promise<CategoriesDto> {
    return await this.categoriesRepository.findOne({
      where : {idCategories : id}
    })
      .catch((error) => {
        console.log(ErrorTypeCategories.CATEGORIE_NOT_EXIST)
        throw new HttpException(ErrorTypeCategories.CATEGORIE_NOT_EXIST, ErrorStatus.CATEGORIE_EXIST)
      })
  }


  async findByNom(nom: string): Promise<CategoriesDto> {

    return await this.categoriesRepository.findOne({
      where : {nom : nom}
    })
      .catch((error) => {
        console.log(ErrorTypeCategories.CATEGORIE_NOT_EXIST)
        throw new HttpException(ErrorTypeCategories.CATEGORIE_NOT_EXIST, ErrorStatus.CATEGORIE_EXIST)
      })
  }
  /*Demandez la différence entre findone,findoneby et findoneorfail*/

  async create(dto: NewcategoriesDto): Promise<NewcategoriesDto> {
    if (await this.findByNom(dto.nom)) {
      throw new HttpException(ErrorTypeCategories.NOM_EXIST,ErrorStatus.NOM_EXIST
      );
    }
    let categorie : CategoriesEntity = this.categoriesRepository.create(dto)

    return this.categoriesRepository.save(categorie)
        .catch(_ => {
          throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_UNKNOW)
        })
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
  }
}
