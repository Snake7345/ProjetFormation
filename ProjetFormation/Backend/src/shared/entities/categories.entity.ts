/*Description de l'entité, à faire a la main*/

import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UtilisateurscategoriesEntity} from "./utilisateurscategories.entity";
import {FormationsEntity} from "./formations.entity";

@Entity({ name: 'categories' })
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  idCategories: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  nom: string;

  @Column({ type: 'integer', default: 1 })
  actif: number;

  @OneToMany(() => UtilisateurscategoriesEntity, (utilisateursCategories) => utilisateursCategories.categories)
  categories: UtilisateurscategoriesEntity[]

  @OneToMany(() => FormationsEntity, (formations) => formations.categories)
  formations: FormationsEntity[]
}
