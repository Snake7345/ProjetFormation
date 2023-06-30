  import {Utilisateurs} from "../utilisateurs";
  import {IPermission} from "../../shared/interfaces/IPermission";

  export class UtilisateurCo {
    utilisateur: number
    mail : string
    permissions : IPermission[]

    constructor(utilisateur: number, mail:string, permissions: IPermission[]) {
      this.utilisateur = utilisateur
      this.mail = mail;
      this.permissions = permissions
    }

    public hasPermissions(action: string, type: string): boolean {
      const permissions = sessionStorage.getItem('permissions');

      if (permissions) {
        const parsedPermissions = JSON.parse(permissions);
        return parsedPermissions.some((p: any) => p.action === action && p.type === type);
      }

      return false;
    }

  }


