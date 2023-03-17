export class UtilisateursActivDesactiv{
  idUtilisateur? : number
  actif : number

  constructor(idUtilisateur: number | undefined, actif: number)
  {
    this.idUtilisateur = idUtilisateur;
    this.actif = actif;
  }
}
