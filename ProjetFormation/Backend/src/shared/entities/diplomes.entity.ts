import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {DiplomesUtilisateursEntity} from "./diplomesutilisateurs.entity";
import {FormationsEntity} from "./formations.entity";
//test
@Entity({ name: 'diplomes' })
export class DiplomesEntity {
  @PrimaryGeneratedColumn()
  idDiplomes: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nom: string;

  @OneToMany(() => DiplomesUtilisateursEntity, (diplome) => diplome.diplomeE)
  diplomes: DiplomesUtilisateursEntity[]

  @OneToOne(() => FormationsEntity)
  @JoinColumn()
  formation: FormationsEntity
}
