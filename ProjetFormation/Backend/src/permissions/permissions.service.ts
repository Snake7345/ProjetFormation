import {HttpException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PermissionsEntity } from "../shared/entities/permissions.entity";
import {PermissionsDto} from "../shared/dto/permissions/permissions.dto";

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(PermissionsEntity)
        private permissionsRepository: Repository<PermissionsEntity>,
    ) {
    }

    async getAll(): Promise<PermissionsDto[]> {
        return this.permissionsRepository.find({
            relations:{rolespermissions:true},
            select : {
                idPermissions : true,
                action : true,
                type : true
            }
        })
    }

    async findById(id: number): Promise<PermissionsDto> {
        return await this.permissionsRepository.findOne({
            relations:{rolespermissions:true},
            where : {idPermissions : id},
        })
            .catch((error) => {
                console.log("la permission n\'existe pas")
                throw new HttpException("la permission n\'existe pas", 404)
            })
    }

}