export class FormationsActivDesactiv {
  idFormations?: number
  disponibilite: number

  constructor(idFormations: number | undefined, disponibilite: number) {
    this.idFormations = idFormations;
    this.disponibilite = disponibilite;
  }
}
