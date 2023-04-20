import {Categories} from "./categories";
import {Utilisateurs} from "./utilisateurs";
import {Time} from "@angular/common";

export class Formations {
  idFormations?: number
  nom: string
  infos: string
  dateheureQuestionnaire: Date
  actif: number
  dateheureLimiteInscription: Date
  categories: Categories
  utilisateurs: Utilisateurs
  constructor(nom: string, infos: string, actif: number, dateheureLimiteInscription: Date, dateheureQuestionnaire: Date, categories: Categories, utilisateurs: Utilisateurs) {
    this.nom = nom;
    this.infos = infos;
    this.dateheureQuestionnaire = dateheureQuestionnaire;
    this.actif = actif;
    this.dateheureLimiteInscription = dateheureLimiteInscription;
    this.categories = categories;
    this.utilisateurs = utilisateurs;
  }
}
