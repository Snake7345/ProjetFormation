import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UtilisateursEntity } from "../shared/entities/utilisateurs.entity";
import { RolesEntity } from "../shared/entities/roles.entity";
import { RolesService } from "../roles/roles.service";
import { ErrorStatus, ErrorTypeCategories, ErrorTypeUtilisateurs } from "../shared/utilities/error.enum";
import { UtilisateursDto } from "../shared/dto/utilisateurs/utilisateurs.dto";
import { UpdateutilisateursDto } from "../shared/dto/utilisateurs/updateutilisateurs.dto";

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
    return this.utilisateursRepository.find(
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
    })
  }


  async findById(id: number): Promise<UtilisateursDto> {
    return await this.utilisateursRepository.findOneOrFail({
      relations : {role : true},
      where : {idUtilisateur : id}
    })
      .catch((error) => {
        console.log("l'utilisateur n'existe pas")
        throw new HttpException("l'utilisateur n'existe pas", 404)
      })
  }

    async createUtilisateurs(roleId : number, userToCreate : UtilisateursDto) : Promise<any>
  {
    let role : RolesEntity = await this.rolesRepository.findOneOrFail({
    where : { idRoles : roleId },
    relations : { utilisateurs : true}
  })
      .catch((error) => {
        console.log(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND)
        throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND, ErrorStatus.UTILISATEUR_NOT_FOUND)
      })

    let newUtilisateurs : UtilisateursEntity = this.utilisateursRepository.create(userToCreate)
    await this.utilisateursRepository.save(newUtilisateurs)

    role.utilisateurs.push(newUtilisateurs)

    return await this.rolesRepository.save(role)
      .catch((error) => {
        console.log("role pas ajouté au user")
        throw new HttpException("role pas ajouté au user", 404)
      })
  }

  async updateUtilisateurs(roleId : number, userId : number, utilisateurToUpdate : UpdateutilisateursDto) : Promise<any>
  {
    let role : RolesEntity = await this.rolesRepository.findOneOrFail({
      where : {
        idRoles : roleId,
        utilisateurs : {
          idUtilisateur : userId
        }
      },
      relations : { utilisateurs : true}
    })
      .catch((error) => {
        console.log(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND)
        throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND, ErrorStatus.UTILISATEUR_NOT_FOUND)
      })
    // Element a modifier
    role.utilisateurs[0].nom = utilisateurToUpdate.nom
    role.utilisateurs[0].prenom = utilisateurToUpdate.prenom


    return await this.rolesRepository.save(role)
      .catch((error) => {
        console.log("role pas ajouté au user")
        throw new HttpException("role pas ajouté au user", 404)
      })
  }
/*
  async deleteUtilisateurs(roleId : number, userId : any) : Promise<any>
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
  }
*/

}