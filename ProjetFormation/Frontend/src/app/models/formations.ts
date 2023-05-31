import {Categories} from "./categories";
import {Utilisateurs} from "./utilisateurs";
import {Time} from "@angular/common";

export class Formations {
  idFormations?: number
  nom: string
  infos: string
  statut : string
  dateheureQuestionnaire: Date
  disponibilite: number
  dateheureLimiteInscription: Date
  categories: Categories
  utilisateurs: Utilisateurs
  constructor(nom: string, infos: string, statut:string,  disponibilite: number, dateheureLimiteInscription: Date, dateheureQuestionnaire: Date, categories: Categories, utilisateurs: Utilisateurs) {
    this.nom = nom;
    this.infos = infos;
    this.statut = statut;
    this.dateheureQuestionnaire = dateheureQuestionnaire;
    this.disponibilite = disponibilite;
    this.dateheureLimiteInscription = dateheureLimiteInscription;
    this.categories = categories;
    this.utilisateurs = utilisateurs;
  }
}
