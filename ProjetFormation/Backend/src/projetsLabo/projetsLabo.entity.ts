/*Description de l'entité, à faire a la main*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projetslabo' })
export class ProjetsLaboEntity {
  @PrimaryGeneratedColumn()
  idProjetsLabo: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  nom: string;
}