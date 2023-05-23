import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriesEntity } from "../shared/entities/categories.entity";
import { CategoriesDto } from "../shared/dto/categories/categories.dto";
import { Repository } from "typeorm";
import { ErrorGeneral, ErrorStatus, ErrorTypeCategories } from "../shared/utilities/error.enum";
import { UpdatecategoriesDto } from "../shared/dto/categories/updatecategories.dto";
import { CategorieIdDto } from "../shared/dto/categories/categorieId.dto";
import {NewcategoriesDto} from "../shared/dto/categories/newcategories.dto";
import { ActivdesactivcategoriesDto } from "../shared/dto/categories/activdesactivcategories.dto";

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
      },
      relations:{categories:true}
    })
  }

  async findById(id: number): Promise<CategoriesDto> {
    return await this.categoriesRepository.findOne({
      where : {idCategories : id},
      relations:{categories:true}
    })
      .catch((error) => {
        console.log(ErrorTypeCategories.CATEGORIE_NOT_EXIST)
        throw new HttpException(ErrorTypeCategories.CATEGORIE_NOT_EXIST, ErrorStatus.ERROR_500)
      })
  }


  async findByNom(nom: string): Promise<CategoriesDto> {

    return await this.categoriesRepository.findOne({
      where : {nom : nom},
      relations:{categories:true}
    })
      .catch((error) => {
        console.log(ErrorTypeCategories.CATEGORIE_NOT_EXIST)
        throw new HttpException(ErrorTypeCategories.CATEGORIE_NOT_EXIST, ErrorStatus.ERROR_500)
      })
  }
  /*Demandez la différence entre findone,findoneby et findoneorfail*/

  async create(dto: NewcategoriesDto): Promise<NewcategoriesDto> {
    if (await this.findByNom(dto.nom)) {
      throw new HttpException(ErrorTypeCategories.CATEGORIE_NOM_EXIST,ErrorStatus.ERROR_500
      );
    }
    let categorie : CategoriesEntity = this.categoriesRepository.create(dto)

    return this.categoriesRepository.save(categorie)
        .catch(_ => {
          throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_500)
        })
  }

  async update(dto : UpdatecategoriesDto): Promise<UpdatecategoriesDto> {
    const categorie = await this.findById(dto.idCategories);
    const exists = await this.findByNom(dto.nom);
    if (!categorie) {
      throw new HttpException(ErrorTypeCategories.CATEGORIE_NOT_EXIST,ErrorStatus.ERROR_404
      );
    }
    if (exists && exists.idCategories !== dto.idCategories) {
      throw new HttpException(ErrorTypeCategories.CATEGORIE_EXIST,ErrorStatus.ERROR_500
      );
    }
    return await this.categoriesRepository.save(dto)
      .catch(_ => {
        throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_500)
      })
  }

  async activDesactivCategories(updateCategorie : ActivdesactivcategoriesDto) : Promise<any>
  {
    const cat = await  this.categoriesRepository.findOneOrFail({
      where: {
        idCategories: updateCategorie.idCategories
      },
    })
    cat.actif = updateCategorie.actif
    return await this.categoriesRepository.update(cat.idCategories, cat)
      .catch((error) => {
        throw new HttpException(ErrorTypeCategories.CATEGORIE_PROBLEM, ErrorStatus.ERROR_500)
      })
  }

  async delete(dtoId: CategorieIdDto): Promise<UpdatecategoriesDto> {
    if(!await this.findById(dtoId.idCategories))
    {
      throw new HttpException(ErrorTypeCategories.CATEGORIE_NOT_EXIST,ErrorStatus.ERROR_404
      );
    }
    let categorieToDelete = this.categoriesRepository.create({idCategories : dtoId.idCategories})
    return this.categoriesRepository.softRemove(categorieToDelete)
        .then((res) => {
          return res
        })
        .catch((error) => {
          console.log(error)
          throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_500)
        })
  }
}
