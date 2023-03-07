import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UtilisateursEntity } from "../shared/entities/utilisateurs.entity";
import { RolesEntity } from "../shared/entities/roles.entity";
import { RolesService } from "../roles/roles.service";
import { ErrorStatus, ErrorTypeUtilisateurs } from "../shared/utilities/error.enum";
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

  async getAllUtilisateurs(roleId : number) : Promise<any>
  {
    return this.rolesRepository.findOneOrFail({
      where : {idRoles : roleId},
      relations : {utilisateurs : true}
    })
      .catch((error) => {
        console.log(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND)
        throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND, ErrorStatus.UTILISATEUR_NOT_FOUND)
      })
  }


  async getOneUtilisateurById(roleId : number, userId : number) : Promise<any> {
    return this.rolesRepository.findOneOrFail({
      where: {
        idRoles: roleId,
        utilisateurs: { idUtilisateur: userId }
      },
      relations: { utilisateurs: true }
    })
      .catch((error) => {
        console.log(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND)
        throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND, ErrorStatus.UTILISATEUR_NOT_FOUND)
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

  async deleteUtilisateurs(roleId : number, userId : any) : Promise<any>
  {
    let user : UsersEntity = await this.usersRepo.findOneOrFail({
      where : {
        id : userId,
        gardens : {
          id : gardenId
        }
      },
      relations : { gardens : true}
    })
      .catch((error) => {
        console.log(ErrorMessage.USER_NOT_FOUND)
        throw new HttpException(ErrorMessage.USER_NOT_FOUND, ErrorStatus.USER_NOT_FOUND)
      })


    return await this.gardensRepo.softRemove(user.gardens[0])
  }


}