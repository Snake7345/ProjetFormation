import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DiplomesEntity} from "../shared/entities/diplomes.entity";

@Injectable()
export class DiplomesService {
  constructor(
    @InjectRepository(DiplomesEntity)
    private diplomesRepository: Repository<DiplomesEntity>,
  ) {}

}