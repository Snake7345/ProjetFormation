/*Description de l'entité, à faire a la main*/

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjetsLaboEntity } from "../projetsLabo/projetsLabo.entity";

@Entity({ name: 'valeurslabo' })
export class ValeursLaboEntity {
  @PrimaryGeneratedColumn()
  idValeursLabo: number;

  @Column("decimal", { precision: 5, scale: 2, nullable:false })
  valeur: number;
  @OneToMany(() => ProjetsLaboEntity, (projet) => projet.idProjetsLabo)
  projetLabos: ProjetsLaboEntity[]
}