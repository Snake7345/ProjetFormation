export class Roles {

  idRoles? : number
  denomination : string
  actif : number

  constructor(denomination: string,actif: number)
  {
    this.denomination = denomination;
    this.actif = actif;
  }
}
