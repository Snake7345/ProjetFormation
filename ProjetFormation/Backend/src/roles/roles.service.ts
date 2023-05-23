import {HttpException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RolesEntity } from "../shared/entities/roles.entity";
import {RolesDto} from "../shared/dto/roles/roles.dto";
import {ErrorGeneral, ErrorStatus} from "../shared/utilities/error.enum";
import {UpdaterolesDto} from "../shared/dto/roles/updateroles.dto";
import {RolespermissionsEntity} from "../shared/entities/rolespermissions.entity";
import {PermissionsDto} from "../shared/dto/permissions/permissions.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
    @InjectRepository(RolespermissionsEntity)
    private rolesPermissionsRepository: Repository<RolespermissionsEntity>
  ) {}

  async getAll(): Promise<RolesDto[]> {
    return this.rolesRepository.find({
      relations : {rolespermissions:true},
      select : {
        idRoles : true,
        denomination : true,
        actif : true
      }
    })
  }



  async findById(id: number): Promise<RolesDto> {
    return await this.rolesRepository.findOne({
      relations : {rolespermissions:true},
      where : {idRoles : id},

    })
        .catch((error) => {
          console.log("Le role n'existe pas")
          throw new HttpException("Le role n'existe pas", ErrorStatus.ERROR_404)
        })
  }

  async findByNom(nom: string): Promise<RolesDto> {
    return await this.rolesRepository.findOne({
      relations : {rolespermissions:true},
      where : {denomination : nom},
    })
        .catch((error) => {
          console.log("Le role n'existe pas")
          throw new HttpException("Le role n'existe pas", ErrorStatus.ERROR_404)
        })
  }

  async create(dto: RolesDto): Promise<RolesDto> {
    if (await this.findByNom(dto.denomination)) {
      throw new HttpException("Le role existe déjà",ErrorStatus.ERROR_500
      );
    }
    let role : RolesEntity = this.rolesRepository.create(dto)

    return this.rolesRepository.save(role)
        .catch(_ => {
          throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_500)
        })
  }

  async update(dto : UpdaterolesDto): Promise<UpdaterolesDto> {
    const role = await this.findById(dto.idRoles);
    const exists = await this.findByNom(dto.denomination);
    if (!role) {
      throw new HttpException("le role n'existe pas",ErrorStatus.ERROR_404
      );
    }
    if (exists && exists.idRoles !== dto.idRoles) {
      throw new HttpException("Le role existe déjà",ErrorStatus.ERROR_500
      );
    }
    return await this.rolesRepository.save(dto)
        .catch(_ => {
          throw new HttpException(ErrorGeneral.ERROR_UNKNOW, ErrorStatus.ERROR_500)
        })
    console.log("Le role est modifié")
  }

}