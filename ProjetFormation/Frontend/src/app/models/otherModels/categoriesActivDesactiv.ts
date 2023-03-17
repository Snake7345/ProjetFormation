export class CategoriesActivDesactiv{
  idCategories? : number
  actif : number

  constructor(idCategories: number | undefined, actif: number)
  {
    this.idCategories = idCategories
    this.actif = actif;
  }
}
