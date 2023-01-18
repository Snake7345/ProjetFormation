/*Description de l'entité, à faire a la main*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'valeurslabo' })
export class ValeursLaboEntity {
  @PrimaryGeneratedColumn()
  idValeursLabo: number;

  @Column("decimal", { precision: 5, scale: 2, nullable:false })
  valeur: number;
}