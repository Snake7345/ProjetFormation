import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DiplomesEntity} from "../diplomes/diplomes.entity";
import {UtilisateursEntity} from "../utilisateurs/utilisateurs.entity";

@Entity({ name: 'diplomesUtilisateurs' })
export class DiplomesUtilisateursEntity {

  @PrimaryGeneratedColumn()
  idDiplomesUtilisateurs: number;

  @ManyToOne(() => DiplomesEntity, (diplomeEntity) => diplomeEntity.diplomes)
  diplomeE: DiplomesEntity

  @ManyToOne(() => UtilisateursEntity, (utilisateurEntity) => utilisateurEntity.diplomes)
  diplomeU: UtilisateursEntity
}