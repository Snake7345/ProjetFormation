export class FormationsActivDesactiv {
  idFormations?: number
  actif: number

  constructor(idFormations: number | undefined, actif: number) {
    this.idFormations = idFormations;
    this.actif = actif;
  }
}
