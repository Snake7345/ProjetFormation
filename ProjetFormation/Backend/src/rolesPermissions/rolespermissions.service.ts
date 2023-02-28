import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RolespermissionsEntity } from "../shared/entities/rolespermissions.entity";

@Injectable()
export class RolespermissionsService {
    constructor(
        @InjectRepository(RolespermissionsEntity)
        private rolespermissionsRepository: Repository<RolespermissionsEntity>,
    ) {
    }
}