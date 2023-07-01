import {HttpException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
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
import {CustomJwtService} from "../jwt/customjwt.service";

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
    private readonly customJwtService: CustomJwtService
  ) {}

  async getAll(): Promise<UtilisateursDto[]> {
    return (await this.utilisateursRepository.find(
      {
        relations : {role : true, utilisateurcategories:true},
      select : {
        idUtilisateurs : true,
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
            idUtilisateurs : true,
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

  private generateToken(user: UtilisateursDto): string {
    const token = this.customJwtService.generateToken(user);
    console.log("JE SUIS UN TOKEN  : ", token)
    return token;
  }

  async connexionGetAll(invite: ConnexionutilisateursDto): Promise<{ utilisateur: UtilisateursDto; permissions: PermissionsDto[]; token: string }> {
    const { mail, password } = invite;
    const utilisateur = await this.utilisateursRepository.findOne({
      relations: { role: true, utilisateurcategories: true },
      where: { mail },
    });

    if (!utilisateur || !(await bcrypt.compare(password, utilisateur.password))) {
      throw new UnauthorizedException(ErrorTypeUtilisateurs.UTILISATEUR_PASS_AND_MAIL_ERROR);
    }

    const rolePermissions = await this.rolesPermissionsRepository.find({
      where: { roles: { idRoles: utilisateur.role.idRoles } },
      relations: ['permissions'],
    });

    const permissions = rolePermissions.map(rp => rp.permissions);
    const token = this.generateToken(utilisateur);
    return {
      utilisateur,
      permissions,
      token,
    };
  }



  async findById(id: number): Promise<UtilisateursDto> {
    try {
      const user = await this.utilisateursRepository.findOneOrFail({
        relations : {role : true, utilisateurcategories:true},
        where : {idUtilisateurs : id}
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
        idUtilisateurs: Not(id) }
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
        idUtilisateurs: utilisateurToUpdate.idUtilisateurs
      },
    })

    /*const count :number = await this.utilisateursRepository.count({where:{mail:utilisateurToUpdate.mail,
        idUtilisateur: Not(utilisateurToUpdate.idUtilisateur) }})*/
    const count = await this.findCountMail(utilisateurToUpdate.mail, utilisateurToUpdate.idUtilisateurs)
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


    return await this.utilisateursRepository.update(user.idUtilisateurs, user)
      .catch((error) => {
        throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_404)
      })
  }

  async activDesactivUtilisateurs(updateUtilisateur : ActivdesactivutilisateursDto) : Promise<any>
  {
    const user = await  this.utilisateursRepository.findOneOrFail({
      where: {
        idUtilisateurs: updateUtilisateur.idUtilisateurs
      },
    })
    user.actif = updateUtilisateur.actif
    return await this.utilisateursRepository.update(user.idUtilisateurs, user)
      .catch((error) => {
        throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_404)
      })
  }

}