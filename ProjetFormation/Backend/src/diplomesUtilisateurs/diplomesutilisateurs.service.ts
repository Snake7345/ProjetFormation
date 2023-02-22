import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DiplomesUtilisateursEntity} from "./diplomesutilisateurs.entity";

@Injectable()
export class DiplomesutilisateursService {
  constructor(
    @InjectRepository(DiplomesUtilisateursEntity)
    private categoriesRepository: Repository<DiplomesUtilisateursEntity>,
  ) {
  }
}