import {HttpException, Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { UtilisateursEntity } from "../shared/entities/utilisateurs.entity";
import { RolesEntity } from "../shared/entities/roles.entity";
import { RolesService } from "../roles/roles.service";
import { ErrorGeneral, ErrorStatus, ErrorTypeCategories, ErrorTypeUtilisateurs } from "../shared/utilities/error.enum";
import { UtilisateursDto } from "../shared/dto/utilisateurs/utilisateurs.dto";
import { UpdateutilisateursDto } from "../shared/dto/utilisateurs/updateutilisateurs.dto";
import { ActivdesactivutilisateursDto } from "../shared/dto/utilisateurs/activdesactivutilisateurs.dto";
import { ConnexionutilisateursDto } from "../shared/dto/utilisateurs/connexionutilisateurs.dto";
import * as bcrypt from "bcrypt";
import { PermissionsDto } from "../shared/dto/permissions/permissions.dto";
import { RolespermissionsEntity } from "../shared/entities/rolespermissions.entity";

@Injectable()
export class UtilisateursService {

  constructor(
    @InjectRepository(UtilisateursEntity)
    private utilisateursRepository: Repository<UtilisateursEntity>,
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
    @InjectRepository(RolespermissionsEntity)
    private rolesPermissionsRepository: Repository<RolespermissionsEntity>,
    private readonly rolesService : RolesService,
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

  async getAllByID(id:number): Promise<UtilisateursDto[]> {
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
          },
          where: {
            role: {
              idRoles: id,
            },
          },
        })).map(u => ({ ...u, role: u.role}))
  }

  async cryptPassword(password: string):Promise<string>
  {
    password = await bcrypt.hash(password, 8)
    return password
  }

  /*async connexionvalid(invite: ConnexionutilisateursDto):Promise<UtilisateursDto>//Promise<SigninoutDto>
    {

      try {
        const user = await this.utilisateursRepository.findOneOrFail({
          relations : {role : true, utilisateurcategories:true},
          where: {mail: invite.mail}
        });
        if(!await bcrypt.compare(invite.password, user.password))//TODO : Optimisation à faire sur le throw
          throw new HttpException("l'adresse mail et/ou le mot de passe est incorrecte", 404)

        return {...user, role: user.role, idUtilisateur:user.idUtilisateur}

        const payload = {sub: user.idUtilisateur, role:user.role.denomination };
        return {
          access_token: this.jwtService.sign(payload, {secret: "miaou", expiresIn:60*60})
        };

      }
      catch(error) {
        throw new HttpException("l'adresse mail et/ou le mot de passe est incorrecte", 404)
      }
    }*/

  /*async connexionGetAll(invite: ConnexionutilisateursDto): Promise<{ utilisateur: UtilisateursDto; permissions: PermissionsDto[] }> {
    try {
      const utilisateur = await this.utilisateursRepository.findOne({
        relations: { role: true, utilisateurcategories: true },
        where: { mail: invite.mail },
      });

      if (!utilisateur || !(await bcrypt.compare(invite.password, utilisateur.password))) {
        throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_PASS_AND_MAIL_ERROR, ErrorStatus.ERROR_500);
      }

      const rolePermissions = await this.rolesPermissionsRepository.find({
        where: { roles: { idRoles: utilisateur.role.idRoles } },
        relations: ['permissions'],
      });

      const permissions = rolePermissions.map(rp => rp.permissions);

      return {
        utilisateur,
        permissions,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_500);
      }
    }
  }*/

  async connexionGetAll(invite: ConnexionutilisateursDto): Promise<{ utilisateur: UtilisateursDto; permissions: PermissionsDto[] }> {
    const utilisateur = await this.utilisateursRepository.findOne({
      relations: { role: true, utilisateurcategories: true },
      where: { mail: invite.mail },
    });

    if (!utilisateur || !(await bcrypt.compare(invite.password, utilisateur.password))) {
      throw new NotFoundException(ErrorTypeUtilisateurs.UTILISATEUR_PASS_AND_MAIL_ERROR);
    }

    const rolePermissions = await this.rolesPermissionsRepository.find({
      where: { roles: { idRoles: utilisateur.role.idRoles } },
      relations: ['permissions'],
    });

    const permissions = rolePermissions.map(rp => rp.permissions);

    return {
      utilisateur,
      permissions,
    };
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
      throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_NOT_FOUND, ErrorStatus.ERROR_404)
    }
  }

  async findByNRN(NRN: string): Promise<UtilisateursDto> {

    return await this.utilisateursRepository.findOne({
      relations : {role : true, utilisateurcategories:true, diplomesutilisateurs:true},
      where : {NRN : NRN}
    })
        .catch((error) => {
          console.log(ErrorTypeCategories.CATEGORIE_NOT_EXIST)
          throw new HttpException(ErrorTypeCategories.CATEGORIE_NOT_EXIST, ErrorStatus.ERROR_404)
        })
  }

  async findByMail(mail: string): Promise<UtilisateursDto> {

    return await this.utilisateursRepository.findOne({
      relations : {role : true, utilisateurcategories:true},
      where : {mail : mail}
    })
      .catch((error) => {
        throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_MAIL_NOT_EXIST, ErrorStatus.ERROR_500)
      })
  }

  async findCountMail(mail: string, id : number): Promise<number> {

    return await this.utilisateursRepository.count({where:{mail:mail,
        idUtilisateur: Not(id) }
    })
      .catch((error) => {
        throw new HttpException("Probleme avec le comptage des adresse mail", ErrorStatus.ERROR_500)
      })

}

  async createUtilisateurs(userToCreate: UtilisateursDto): Promise<any> {
      userToCreate.password = await this.cryptPassword(userToCreate.password);

      if (await this.findByNRN(userToCreate.NRN)) {
        throw new HttpException(
            ErrorTypeUtilisateurs.UTILISATEUR_NRN_EXIST,
            ErrorStatus.ERROR_500
        );
      }

      if (await this.findByMail(userToCreate.mail)) {
        throw new HttpException(
            ErrorTypeUtilisateurs.UTILISATEUR_MAIL_EXIST,
            ErrorStatus.ERROR_500
        );
      }

      const role = await this.rolesRepository.findOneBy({ idRoles: userToCreate.role.idRoles });

      const utilisateur: UtilisateursEntity = this.utilisateursRepository.create({
        ...userToCreate,
        role
      });

      return await this.utilisateursRepository.save(utilisateur)
      .catch((error) => {
        throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_404)
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
      throw new HttpException(ErrorTypeUtilisateurs.UTILISATEUR_MAIL_EXIST, ErrorStatus.ERROR_500
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
        throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_404)
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
    return await this.utilisateursRepository.update(user.idUtilisateur, user)
      .catch((error) => {
        throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_404)
      })
  }

}