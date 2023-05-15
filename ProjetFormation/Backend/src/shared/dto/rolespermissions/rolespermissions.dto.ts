import {PermissionsDto} from "../permissions/permissions.dto";
import {RolesDto} from "../roles/roles.dto";

export class RolespermissionsDto
{
    idRolespermissions : number
    roles : RolesDto
    permissions : PermissionsDto
}