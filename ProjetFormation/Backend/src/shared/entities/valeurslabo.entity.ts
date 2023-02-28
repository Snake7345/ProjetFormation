/*Description de l'entité, à faire a la main*/

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjetslaboEntity } from "./projetslabo.entity";
import { PayslaboEntity } from "./payslabo.entity";

@Entity({ name: 'valeurslabo' })
export class ValeurslaboEntity {
  @PrimaryGeneratedColumn()
  idValeursLabo: number;

  @Column("decimal", { precision: 5, scale: 2, nullable:false })
  valeur: number;

  @OneToMany(() => ProjetslaboEntity,
      projetLabos => projetLabos.FK_idValeursLabo, {cascade: true})
  projetLabos: ProjetslaboEntity[]

  @OneToMany(() => PayslaboEntity,
    paysLabos => paysLabos.idPaysLabo, {cascade: true})
  paysLabos: PayslaboEntity[]


}