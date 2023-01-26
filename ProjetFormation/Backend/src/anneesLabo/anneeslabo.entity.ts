/*Description de l'entité, à faire a la main*/

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjetslaboEntity } from "../projetsLabo/projetslabo.entity";

@Entity({ name: 'anneeslabo' })
export class AnneeslaboEntity {
  @PrimaryGeneratedColumn()
  idAnneesLabo: number;

  @Column({ type: 'integer', nullable: false })
  annee: number;

  @OneToMany(type => ProjetslaboEntity,
      projetLabos => projetLabos.FK_idAnneesLabo)
  projetLabos: ProjetslaboEntity[]
}