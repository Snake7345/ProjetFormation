import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PermissionsEntity} from "./permissions.entity";

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(PermissionsEntity)
        private permissionsRepository: Repository<PermissionsEntity>,
    ) {
    }
}