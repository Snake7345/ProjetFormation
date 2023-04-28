import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { UtilisateursEntity } from "../shared/entities/utilisateurs.entity";
import { RolesEntity } from "../shared/entities/roles.entity";
import { RolesService } from "../roles/roles.service";
import { ErrorStatus, ErrorTypeCategories } from "../shared/utilities/error.enum";
import { UtilisateursDto } from "../shared/dto/utilisateurs/utilisateurs.dto";
import { UpdateutilisateursDto } from "../shared/dto/utilisateurs/updateutilisateurs.dto";
import {ActivdesactivutilisateursDto} from "../shared/dto/utilisateurs/activdesactivutilisateurs.dto";
import { ConnexionutilisateursDto } from "../shared/dto/utilisateurs/connexionutilisateurs.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilisateursService {

  constructor(
    @InjectRepository(UtilisateursEntity)
    private utilisateursRepository: Repository<UtilisateursEntity>,
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
    private readonly rolesService : RolesService
  ) {}

  async getAll(): Promise<UtilisateursDto[]> {
    return (await this.utilisateursRepository.find(
      {
        relations : {role : true, utilisateurcategories:true},
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

  async cryptPassword(password: string):Promise<string>
  {
    password = await bcrypt.hash(password, 8)
    return password
  }

  /*async comparePassword(passwordNonCrypte:string,passwordCrypte)
  {
    if(!await bcrypt.compare(passwordNonCrypte, passwordCrypte))
    {
      throw new HttpException("l'adresse mail et/ou le mot de passe est incorrecte", 404)
    }
  }*/

  async connexionvalid(invite: ConnexionutilisateursDto):Promise<UtilisateursDto>
    {

      try {
        const user = await this.utilisateursRepository.findOneOrFail({
          relations : {role : true, utilisateurcategories:true},
          where: {mail: invite.mail}
        });
        if(!await bcrypt.compare(invite.password, user.password))//TODO : Optimisation à faire sur le throw
          throw new HttpException("l'adresse mail et/ou le mot de passe est incorrecte", 404)

        return {...user, role: user.role, idUtilisateur:user.idUtilisateur}
      }
      catch(error) {
        throw new HttpException("l'adresse mail et/ou le mot de passe est incorrecte", 404)
      }
    }

  async findById(id: number): Promise<UtilisateursDto> {
    try {
      const user = await this.utilisateursRepository.findOneOrFail({
        relations : {role : true, utilisateurcategories:true},
        where : {idUtilisateur : id}
      });
      return {...user, role: user.role}
    }
    catch(error) {
      console.log("l'utilisateur n'existe pas")
      throw new HttpException("l'utilisateur n'existe pas", 404)
    }
  }

  async findByNRN(NRN: string): Promise<UtilisateursDto> {

    return await this.utilisateursRepository.findOne({
      relations : {role : true, utilisateurcategories:true, diplomesutilisateurs:true},
      where : {NRN : NRN}
    })
        .catch((error) => {
          console.log(ErrorTypeCategories.CATEGORIE_NOT_EXIST)
          throw new HttpException(ErrorTypeCategories.CATEGORIE_NOT_EXIST, ErrorStatus.CATEGORIE_EXIST)
        })
  }

  async findByMail(mail: string): Promise<UtilisateursDto> {

    return await this.utilisateursRepository.findOne({
      relations : {role : true, utilisateurcategories:true},
      where : {mail : mail}
    })
      .catch((error) => {
        console.log("le mail n'existe pas")
        throw new HttpException("Le mail n'existe pas", 500)
      })
  }

  async findCountMail(mail: string, id : number): Promise<number> {

    return await this.utilisateursRepository.count({where:{mail:mail,
        idUtilisateur: Not(id) }
    })
      .catch((error) => {
        console.log("Probleme avec le comptage des adresse mail")
        throw new HttpException("Probleme avec le comptage des adresse mail", 500)
      })

}

    async createUtilisateurs(userToCreate : UtilisateursDto) : Promise<any>
    {
      userToCreate.password = await this.cryptPassword(userToCreate.password)
      if (await this.findByNRN(userToCreate.NRN)) {
        throw new HttpException("Le NRN existe déjà, veuillez en choisir un autre", 500
        );
      }
      if (await this.findByMail(userToCreate.mail)) {
        throw new HttpException("Cette adresse mail existe déjà, veuillez en choisir une autre", 500
        );
      }
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
    utilisateurToUpdate.password = await this.cryptPassword(utilisateurToUpdate.password)

    const role = await this.rolesRepository.findOneBy(
        {idRoles : utilisateurToUpdate.role}
    )
    const user = await  this.utilisateursRepository.findOneOrFail({
      where: {
        idUtilisateur: utilisateurToUpdate.idUtilisateur
      },
    })

    /*const count :number = await this.utilisateursRepository.count({where:{mail:utilisateurToUpdate.mail,
        idUtilisateur: Not(utilisateurToUpdate.idUtilisateur) }})*/
    const count = await this.findCountMail(utilisateurToUpdate.mail, utilisateurToUpdate.idUtilisateur)
    if(count>0)
    {
      throw new HttpException("Le mail existe déjà, veuillez en choisir un autre", 500
      );
    }
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


}