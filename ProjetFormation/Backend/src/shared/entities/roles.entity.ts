import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UtilisateursEntity} from "./utilisateurs.entity";
import {RolespermissionsEntity} from "./rolespermissions.entity";

@Entity({ name: 'roles' })
export class RolesEntity {
  @PrimaryGeneratedColumn()
  idRoles : number

  @Column({ type: 'varchar', length: 70, nullable: false })
  denomination: string;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  actif : number

  @OneToMany(() => UtilisateursEntity, (utilisateur) => utilisateur.role)
  utilisateurs : UtilisateursEntity[]

  @OneToMany(() => RolespermissionsEntity, (rolespermission) => rolespermission.roles)
  rolespermissions : RolespermissionsEntity[]

}