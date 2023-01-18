/*Description de l'entité, à faire a la main*/

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnneeslaboEntity } from "../anneesLabo/anneeslabo.entity";
import { ValeursLaboEntity } from "../valeursLabo/valeursLabo.entity";

@Entity({ name: 'projetslabo' })
export class ProjetsLaboEntity {
  @PrimaryGeneratedColumn()
  idProjetsLabo: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  nom: string;

  @ManyToOne(() => ValeursLaboEntity, (ValeursLaboEntity) => ValeursLaboEntity.idValeursLabo , {nullable : false})
  FK_idValeursLabo: ValeursLaboEntity

  @ManyToOne(() => AnneeslaboEntity, (AnneesLaboEntity) => AnneesLaboEntity.idAnneesLabo, {nullable : false})
  FK_idAnneesLabo: AnneeslaboEntity
}