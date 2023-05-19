  import {Utilisateurs} from "../utilisateurs";
  import {IPermission} from "../../shared/interfaces/IPermission";

  export class UtilisateurCo {
    utilisateur: Utilisateurs
    permissions : IPermission[]

    constructor(utilisateur: Utilisateurs, permissions : IPermission[]) {
      this.utilisateur = utilisateur
      this.permissions = permissions
    }

    /*public hasPermissions(action : string, type : string)
    {
      return this.permissions.find(p => p.action === action && p.type === type)
    }*/

  }


