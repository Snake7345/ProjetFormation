import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DiplomesEntity } from "./diplomes.entity";
import { UtilisateursEntity } from "./utilisateurs.entity";

@Entity({ name: 'diplomesutilisateurs' })
export class DiplomesUtilisateursEntity {

  @PrimaryGeneratedColumn()
  idDiplomesUtilisateurs: number;

  @ManyToOne(() => DiplomesEntity, (diplomeEntity) => diplomeEntity.diplomes, { nullable: false })
  diplomeE: DiplomesEntity

  @ManyToOne(() => UtilisateursEntity, (utilisateurEntity) => utilisateurEntity.diplomesutilisateurs, { nullable: false })
  diplomeU: UtilisateursEntity
}