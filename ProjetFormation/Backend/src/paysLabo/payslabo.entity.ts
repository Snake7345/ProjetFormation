/*Description de l'entité, à faire à la main*/

import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjetslaboEntity } from "../projetsLabo/projetslabo.entity";
import { ValeurslaboEntity } from "../valeursLabo/valeurslabo.entity";

@Entity({ name: 'payslabo' })
export class PayslaboEntity {
  @PrimaryGeneratedColumn()
  idPaysLabo: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  denomination: string;

  @ManyToOne(type => ValeurslaboEntity,
    FK_idValeursLabo => FK_idValeursLabo.paysLabos,
    {
      nullable: false })
  FK_idValeursLabo: ValeurslaboEntity

}