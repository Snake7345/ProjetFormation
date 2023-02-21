/*Description de l'entité, à faire a la main*/

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
  FK_idValeursLabo: ValeurslaboEntity

  @ManyToOne((type) => AnneeslaboEntity,
    (FK_idAnneesLabo) => FK_idAnneesLabo.projetLabos,
    {nullable : false})
  FK_idAnneesLabo: AnneeslaboEntity
}