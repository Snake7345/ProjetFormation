import {Valeurslabo} from "./valeurslabo";
import {Anneeslabo} from "./anneeslabo";

export interface Projetslabo {
  idProjetsLabo : number
  nom : string
  FK_idValeursLabo : Valeurslabo
  FK_idAnneesLabo : Anneeslabo
}
