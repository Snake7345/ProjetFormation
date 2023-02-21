import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DiplomesUtilisateursEntity } from "../diplomesUtilisateurs/diplomesutilisateurs.entity";

@Entity({ name: 'diplomes' })
export class DiplomesEntity {
  @PrimaryGeneratedColumn()
  idDiplomes: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nom: string;

  @OneToMany(() => DiplomesUtilisateursEntity, (diplome) => diplome.diplomeE)
  diplomes: DiplomesUtilisateursEntity[]
}
