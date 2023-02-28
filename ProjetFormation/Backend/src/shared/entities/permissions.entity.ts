import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolespermissionsEntity } from "./rolespermissions.entity";

@Entity({ name: 'permissions' })
export class PermissionsEntity {
  @PrimaryGeneratedColumn()
  idPermissions: number

  @Column({ type: 'varchar', length: 150, nullable: false })
  action: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  type: string;

  @OneToMany(() => RolespermissionsEntity, (rolespermission) => rolespermission.permissions)
  rolespermissions : RolespermissionsEntity[]
}