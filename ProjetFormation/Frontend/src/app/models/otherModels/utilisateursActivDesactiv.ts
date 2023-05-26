export class UtilisateursActivDesactiv{
  idUtilisateurs? : number
  actif : number

  constructor(idUtilisateurs: number | undefined, actif: number)
  {
    this.idUtilisateurs = idUtilisateurs;
    this.actif = actif;
  }
}
