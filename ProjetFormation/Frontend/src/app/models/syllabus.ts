import {Formations} from "./formations";

export class Syllabus {

  idSyllabus? : number
  nom : string
  chemin : string
  actif : number
  formation : Formations

  constructor(nom: string,chemin: string, actif: number, formation : Formations)
  {
    this.nom = nom;
    this.chemin = chemin;
    this.actif = actif;
    this.formation = formation
  }
}
