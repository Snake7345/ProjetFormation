/*Description de l'entité, à faire a la main*/

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjetslaboEntity } from "../projetsLabo/projetslabo.entity";

@Entity({ name: 'valeurslabo' })
export class ValeurslaboEntity {
  @PrimaryGeneratedColumn()
  idValeursLabo: number;

  @Column("decimal", { precision: 5, scale: 2, nullable:false })
  valeur: number;

  @OneToMany(type => ProjetslaboEntity, projetLabos => projetLabos.FK_idValeursLabo)
  projetLabos: ProjetslaboEntity[]
}