export class Categories{
  idCategories? : number
  nom : string
  actif : number

  constructor(nom: string, actif: number)
  {
    this.nom = nom;
    this.actif = actif;
  }
}
