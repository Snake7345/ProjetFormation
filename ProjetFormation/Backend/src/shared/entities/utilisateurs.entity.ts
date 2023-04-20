import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesEntity } from "./roles.entity";
import { DiplomesUtilisateursEntity } from "./diplomesutilisateurs.entity";
import { FormationsEntity } from "./formations.entity";
import { ReponsesEntity } from "./reponses.entity";
import { UtilisateurscategoriesEntity } from "./utilisateurscategories.entity";
import { EnumUtilisateur } from "../../utilisateurs/enumUtilisateur";


@Entity({ name: 'utilisateurs' })
export class UtilisateursEntity {
  @PrimaryGeneratedColumn()
  idUtilisateur : number

  @Column({ type: 'varchar', length: 100, nullable: false })
  nom: string;


  @Column({ type: 'varchar', length: 100, nullable: false })
  prenom: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique:true })
  mail: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  NRN: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;


  @Column({
    type: "enum",
    enum: EnumUtilisateur,
    default: EnumUtilisateur.x,
  })
  sexe: EnumUtilisateur

  @Column({ type: 'tinyint', width: 1, default: 1 })
  actif : number

  @ManyToOne(() => RolesEntity, (role) => role.utilisateurs, { nullable: false })
  role: RolesEntity

  @OneToMany(() => DiplomesUtilisateursEntity, (diplomesUtilisateursEntity) =>
    diplomesUtilisateursEntity.diplomeU)
  diplomes : DiplomesUtilisateursEntity[]

  @OneToMany(() => FormationsEntity, (formations) =>
      formations.utilisateurs)
  formations : FormationsEntity[]

  @OneToMany(() => ReponsesEntity, (rep) =>
      rep.utilisateurs)
  reponses : ReponsesEntity[]

  @OneToMany(() => UtilisateurscategoriesEntity, (utilcat) =>
      utilcat.utilisateurs)
  utilisateurcategories : UtilisateurscategoriesEntity[]

}