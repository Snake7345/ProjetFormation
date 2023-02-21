import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RolesEntity} from "../roles/roles.entity";
import {PermissionsEntity} from "../permissions/permissions.entity";

@Entity({ name: 'rolespermissions' })
export class RolespermissionsEntity {
  @PrimaryGeneratedColumn()
  idRolespermissions : number

  @ManyToOne(() => RolesEntity, (roles) => roles.rolespermissions)
  roles: RolespermissionsEntity

  @ManyToOne(() => PermissionsEntity, (permissions) => permissions.rolespermissions)
  permissions: PermissionsEntity
}