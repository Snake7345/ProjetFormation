import {HttpException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RolespermissionsEntity } from "../shared/entities/rolespermissions.entity";
import {RolespermissionsDto} from "../shared/dto/rolespermissions/rolespermissions.dto";
import {RolesDto} from "../shared/dto/roles/roles.dto";

@Injectable()
export class RolespermissionsService {
    constructor(
        @InjectRepository(RolespermissionsEntity)
        private rolespermissionsRepository: Repository<RolespermissionsEntity>,
    ) {
    }

    async getAll():Promise<RolespermissionsDto[]> {
        return (await this.rolespermissionsRepository.find(
            {
                relations : {roles : true, permissions:true},
                select : {
                    idRolespermissions:true,
                }
            })).map(u => ({ ...u, roles: u.roles, permissions:u.permissions}))
    }
}
