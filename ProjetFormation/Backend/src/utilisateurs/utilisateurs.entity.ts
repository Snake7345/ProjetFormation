import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesEntity } from "../roles/roles.entity";
import { DiplomesUtilisateursEntity } from "../diplomesUtilisateurs/diplomesutilisateurs.entity";

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

  @Column({ type: 'tinyint', width: 1, default: 1 })
  actif : number

  @ManyToOne(() => RolesEntity, (role) => role.utilisateurs)
  role: RolesEntity

  @OneToMany(() => DiplomesUtilisateursEntity, (diplomesUtilisateursEntity) =>
    diplomesUtilisateursEntity.diplomeU)
  diplomes : DiplomesUtilisateursEntity[]

}