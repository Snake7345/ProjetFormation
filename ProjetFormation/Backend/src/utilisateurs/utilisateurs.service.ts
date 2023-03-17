import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UtilisateursEntity } from "../shared/entities/utilisateurs.entity";
import { RolesEntity } from "../shared/entities/roles.entity";
import { RolesService } from "../roles/roles.service";
import { ErrorGeneral, ErrorStatus, ErrorTypeCategories, ErrorTypeUtilisateurs } from "../shared/utilities/error.enum";
import { UtilisateursDto } from "../shared/dto/utilisateurs/utilisateurs.dto";
import { UpdateutilisateursDto } from "../shared/dto/utilisateurs/updateutilisateurs.dto";
import { CategoriesEntity } from "../shared/entities/categories.entity"
import {ActivdesactivutilisateursDto} from "../shared/dto/utilisateurs/activdesactivutilisateurs.dto";

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(UtilisateursEntity)
    private utilisateursRepository: Repository<UtilisateursEntity>,
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
    private readonly rolesService : RolesService
  ) {}

  async getAllGardensByRole(roleId : number) : Promise<any>
  {
    return this.rolesRepository.findOneOrFail({
      where : { idRoles : roleId},
      relations : { utilisateurs : true}
    })
      .catch((error) => {
        console.log(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND)
        throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND, 404)
      })
  }

  async getRoleOneGardensById(roleId : number, utilisateurId : number) : Promise<any>
  {
    return this.rolesRepository.findOneOrFail({
      where : {
        idRoles : roleId,
        utilisateurs : {idUtilisateur : utilisateurId}
      },
      relations : { utilisateurs : true}
    })
      .catch((error) => {
        console.log(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND)
        throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND, ErrorStatus.UTILISATEUR_NOT_FOUND)
      })
  }

  async getAll(): Promise<UtilisateursDto[]> {
    return (await this.utilisateursRepository.find(
      {
        relations : {role : true},
      select : {
        idUtilisateur : true,
        nom : true,
        prenom : true,
        mail : true,
        NRN : true,
        password : true,
        sexe : true,
        actif : true,
      }
    })).map(u => ({ ...u, role: u.role}))
  }


  async findById(id: number): Promise<UtilisateursDto> {
    try {
      const user = await this.utilisateursRepository.findOneOrFail({
        relations : {role : true},
        where : {idUtilisateur : id}
      });
      return {...user, role: user.role}
    }
    catch(error) {
      console.log("l'utilisateur n'existe pas")
      throw new HttpException("l'utilisateur n'existe pas", 404)
    }
  }

    async createUtilisateurs(userToCreate : UtilisateursDto) : Promise<any>
    {
      const role = await this.rolesRepository.findOneBy(
        {idRoles : userToCreate.role.idRoles}
      )
      let utilisateur : UtilisateursEntity = this.utilisateursRepository.create({...userToCreate, role})
      console.log("utilisateur reçu : ", utilisateur)
      return this.utilisateursRepository.save(utilisateur)
        .catch((error) => {
          console.log("problème avec la création de l'utilisateur")
          throw new HttpException("problème avec la création de l'utilisateur", 404)
        })
    }

  async updateUtilisateurs(utilisateurToUpdate : UpdateutilisateursDto) : Promise<any>
  {
    const role = await this.rolesRepository.findOneBy(
        {idRoles : utilisateurToUpdate.role}
    )
    const user = await  this.utilisateursRepository.findOneOrFail({
      where: {
        idUtilisateur: utilisateurToUpdate.idUtilisateur
      },
    })
    user.nom = utilisateurToUpdate.nom
    user.prenom = utilisateurToUpdate.prenom
    user.NRN = utilisateurToUpdate.NRN
    user.password = utilisateurToUpdate.password
    user.actif = utilisateurToUpdate.actif
    user.mail = utilisateurToUpdate.mail
    user.sexe = utilisateurToUpdate.sexe
    user.role = role
    return await this.utilisateursRepository.update(user.idUtilisateur, user)
      .catch((error) => {
        console.log("Problème concernant la mise a jour de l'utilisateur")
        throw new HttpException("Problème concernant la mise a jour de l'utilisateur", 404)
      })
  }

  async activDesactivUtilisateurs(updateUtilisateur : ActivdesactivutilisateursDto) : Promise<any>
  {
    const user = await  this.utilisateursRepository.findOneOrFail({
      where: {
        idUtilisateur: updateUtilisateur.idUtilisateur
      },
    })
    user.actif = updateUtilisateur.actif
    console.log("je suis un user :", user)
    return await this.utilisateursRepository.update(user.idUtilisateur, user)
      .catch((error) => {
        console.log("Problème concernant la désactivation/activation de l\'utilisateur'")
        throw new HttpException("Problème concernant la désactivation/activation de l\'utilisateur", 404)
      })
  }

  /*async deleteUtilisateurs(roleId : number, userId : any) : Promise<any>
  {
    let user : RolesEntity = await this.rolesRepository.findOneOrFail({
      where : {
        idRoles : roleId,
        utilisateurs : {
          idUtilisateur : userId
        }
      },
      relations : { utilisateurs : true}
    })
      .catch((error) => {
        console.log(ErrorMessage.USER_NOT_FOUND)
        throw new HttpException(ErrorMessage.USER_NOT_FOUND, ErrorStatus.USER_NOT_FOUND)
      })


    return await this.gardensRepo.softRemove(user.gardens[0])
  }*/


}