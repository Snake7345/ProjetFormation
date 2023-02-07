/*Description de l'entité, à faire a la main*/

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjetslaboEntity } from "../projetsLabo/projetslabo.entity";
import { ValeurslaboEntity } from "../valeursLabo/valeurslabo.entity";

@Entity({ name: 'payslabo' })
export class PayslaboEntity {
  @PrimaryGeneratedColumn()
  idPaysLabo: number;

  @Column({ type: 'string', nullable: false })
  denomination: number;

}