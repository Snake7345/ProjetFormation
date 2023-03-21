import {Categories} from "./categories";
import {Utilisateurs} from "./utilisateurs";
import {Time} from "@angular/common";

export class Formations {
  idFormations?: number
  nom: string
  infos: string
  heureQuestionnaire: Time
  actif: number
  dateLimiteInscription: Date
  dateQuestionnaire: Date
  heureLimiteInscription: Time
  categories: Categories
  utilisateurs: Utilisateurs
  constructor(nom: string, infos: string, heureQuestionnaire: Time, actif: number, dateLimiteInscription: Date, dateQuestionnaire: Date,
              heureLimiteInscription: Time, categories: Categories, utilisateurs: Utilisateurs) {
    this.nom = nom;
    this.infos = infos;
    this.heureQuestionnaire = heureQuestionnaire;
    this.actif = actif;
    this.dateLimiteInscription = dateLimiteInscription;
    this.dateQuestionnaire = dateQuestionnaire
    this.heureLimiteInscription = heureLimiteInscription;
    this.categories = categories;
    this.utilisateurs = utilisateurs;
  }
}
