import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Sexe {
  MASCULIN = "masculin",
  FEMININ = "feminin",
  X = "x",
}
@Entity({ name: 'utilisateurs' })
export class UtilisateursEntity {
  @PrimaryGeneratedColumn()
  idUtilisateur : number

  @Column({ type: 'varchar', length: 100, nullable: false })
  nom: string;


  @Column({ type: 'varchar', length: 100, nullable: false })
  prenom: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  mail: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  NRN: string;


  @Column({
    type: "enum",
    enum: Sexe,
    default: Sexe.X,
  })
  sexe: Sexe


}