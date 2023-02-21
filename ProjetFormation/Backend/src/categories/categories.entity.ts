/*Description de l'entité, à faire a la main*/

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories' })
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  idCategories: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  nom: string;

  @Column({ type: 'integer', default: 1 })
  actif: number;
}
