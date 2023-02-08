import { EntityRepository, Repository } from "typeorm";
import { PayslaboEntity } from "./payslabo.entity";

@EntityRepository(PayslaboEntity)
export class PayslaboRepository extends Repository<PayslaboEntity> {}