import { EntityRepository, Repository } from 'typeorm';
import { AnneeslaboEntity } from "./anneeslabo.entity";

@EntityRepository(AnneeslaboEntity)
export class AnneeslaboRepository extends Repository<AnneeslaboEntity> {}
