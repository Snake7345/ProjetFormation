/*Description de l'entité, à faire a la main*/

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnneeslaboEntity } from "../anneesLabo/anneeslabo.entity";
import { ValeurslaboEntity } from "../valeursLabo/valeurslabo.entity";

@Entity({ name: 'projetslabo' })
export class ProjetslaboEntity {
  @PrimaryGeneratedColumn()
  idProjetsLabo: number;

  @Column({ type: 'varchar', length: 40, nullable: false })
  nom: string;

  @ManyToOne(() => ValeurslaboEntity, (ValeurslaboEntity) => ValeurslaboEntity.idValeursLabo , {nullable : false})
  FK_idValeursLabo: ValeurslaboEntity

  @ManyToOne(() => AnneeslaboEntity, (AnneeslaboEntity) => AnneeslaboEntity.idAnneesLabo, {nullable : false})
  FK_idAnneesLabo: AnneeslaboEntity
}