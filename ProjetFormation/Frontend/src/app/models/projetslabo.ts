import {Valeurslabo} from "./valeurslabo";
import {Anneeslabo} from "./anneeslabo";

export interface Projetslabo {
  idprojetsLabo : number
  nom : string
  FK_ValeursLabo : Valeurslabo
  FK_AnneesLabo : Anneeslabo
}
