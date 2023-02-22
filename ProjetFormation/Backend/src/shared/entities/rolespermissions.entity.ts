import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RolesEntity} from "./roles.entity";
import {PermissionsEntity} from "./permissions.entity";

@Entity({ name: 'rolespermissions' })
export class RolespermissionsEntity {
  @PrimaryGeneratedColumn()
  idRolespermissions : number

  @ManyToOne(() => RolesEntity, (roles) => roles.rolespermissions, { nullable: false })
  roles: RolespermissionsEntity

  @ManyToOne(() => PermissionsEntity, (permissions) => permissions.rolespermissions, { nullable: false })
  permissions: PermissionsEntity
}