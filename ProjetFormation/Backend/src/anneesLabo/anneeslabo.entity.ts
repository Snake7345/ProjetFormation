/*Description de l'entité, à faire a la main*/

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjetsLaboEntity } from "../projetsLabo/projetsLabo.entity";

@Entity({ name: 'anneeslabo' })
export class AnneeslaboEntity {
  @PrimaryGeneratedColumn()
  idAnneesLabo: number;

  @Column({ type: 'integer', nullable: false })
  annee: number;

  @OneToMany(() => ProjetsLaboEntity, (projet) => projet.idProjetsLabo)
  projetLabos: ProjetsLaboEntity[]
}