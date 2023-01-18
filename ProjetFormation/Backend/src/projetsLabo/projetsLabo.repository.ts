import { EntityRepository, Repository } from 'typeorm';
import { ProjetsLaboEntity } from "./projetsLabo.entity";

@EntityRepository(ProjetsLaboEntity)
export class ProjetsLaboRepository extends Repository<ProjetsLaboEntity> {}