export class SyllabusActivDesactiv{
  idSyllabus? : number
  actif : number

  constructor(idSyllabus: number | undefined, actif: number)
  {
    this.idSyllabus = idSyllabus;
    this.actif = actif;
  }
}
