import {Utilisateurs} from "../../models/utilisateurs";

export class UtilisateurCo {
  utilisateur: Utilisateurs
  permissions : IPermission[]

  constructor(utilisateur: Utilisateurs, permissions : IPermission[]) {
    this.utilisateur = utilisateur
    this.permissions = permissions
  }
  public hasPermissions(action : string, type : string)
  {
    return this.permissions.find(p => p.action === action && p.type === type)
  }
}
export interface IPermission
{
  idPermissions : number;
  action : string;
  type: string;
}
