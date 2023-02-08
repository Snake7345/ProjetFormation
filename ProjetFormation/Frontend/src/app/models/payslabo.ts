import {Valeurslabo} from "./valeurslabo";

export interface Payslabo {
  idPaysLabo : number
  denomination : string
  FK_idValeursLabo : Valeurslabo
}
