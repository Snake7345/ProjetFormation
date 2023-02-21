import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DiplomesEntity } from "../diplomes/diplomes.entity";
@Entity({ name: 'diplomesUtilisateurs' })
export class DiplomesUtilisateursEntity {

  @PrimaryGeneratedColumn()
  idDiplomesUtilisateurs: number;

  @ManyToOne(() => DiplomesEntity, (diplomeEntity) => diplomeEntity.diplomes)
  diplomeE: DiplomesEntity

  @ManyToOne(() => UtilisateurEntity, (utilisateurEntity) => utilisateurEntity.diplomes)
  diplomeU: UtilisateurEntity
}