/*Description de l'entité, à faire à la main*/

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ValeurslaboEntity } from "./valeurslabo.entity";

@Entity({ name: 'payslabo' })
export class PayslaboEntity {
  @PrimaryGeneratedColumn()
  idPaysLabo: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  denomination: string;

  @ManyToOne(() => ValeurslaboEntity,
    FK_idValeursLabo => FK_idValeursLabo.paysLabos,
    {
      nullable: false })
  FK_idValeursLabo: ValeurslaboEntity

}