import { EntityRepository, Repository } from 'typeorm';
import { ValeurslaboEntity } from "./valeursLabo.entity";

@EntityRepository(ValeurslaboEntity)
export class ValeurslaboRepository extends Repository<ValeurslaboEntity> {}