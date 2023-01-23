import { EntityRepository, Repository } from 'typeorm';
import { ProjetslaboEntity } from "./projetslabo.entity";

@EntityRepository(ProjetslaboEntity)
export class ProjetslaboRepository extends Repository<ProjetslaboEntity> {}