/*Description de l'entité, à faire a la main*/

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnneeslaboEntity } from "../anneesLabo/anneeslabo.entity";
import { ValeurslaboEntity } from "../valeursLabo/valeurslabo.entity";

@Entity({ name: 'projetslabo' })
export class ProjetslaboEntity {
  @PrimaryGeneratedColumn()
  idProjetsLabo: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nom: string;

  @ManyToOne(type => ValeurslaboEntity,
      FK_idValeursLabo => FK_idValeursLabo.projetLabos,
    {
    nullable: false })
  @JoinColumn({name : 'valeur_id', referencedColumnName: 'idValeursLabo'})
  FK_idValeursLabo: ValeurslaboEntity

  @ManyToOne(() => AnneeslaboEntity,
    (FK_idAnneesLabo) => FK_idAnneesLabo.projetLabos,
    {nullable : false})
  @JoinColumn({name : 'annee_id', referencedColumnName: 'idAnneesLabo'})
  FK_idAnneesLabo: AnneeslaboEntity
}