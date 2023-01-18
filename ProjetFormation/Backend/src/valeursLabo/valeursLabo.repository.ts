import { EntityRepository, Repository } from 'typeorm';
import { ValeursLaboEntity } from "./valeursLabo.entity";

@EntityRepository(ValeursLaboEntity)
export class ValeursLaboRepository extends Repository<ValeursLaboEntity> {}