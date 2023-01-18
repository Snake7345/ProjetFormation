/*Description de l'entité, à faire a la main*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'anneeslabo' })
export class AnneeslaboEntity {
  @PrimaryGeneratedColumn()
  idAnneesLabo: number;

  @Column({ type: 'integer', length: 3, nullable: false })
  annee: number;
}