import { EntityRepository, Repository } from 'typeorm';
import { CategoriesEntity } from './categories.entity';

@EntityRepository(CategoriesEntity)
export class CategoriesRepository extends Repository<CategoriesEntity> {}
