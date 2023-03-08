import {Roles} from "./role";
import {Sexe} from "./enum/enumSexe";

export class Utilisateurs{
  idUtilisateur? : number
  nom : string

  prenom : string

  mail : string

  NRN : string

  password : string

  sexe : Sexe
  actif : number

  role : Roles

  constructor(nom: string, prenom : string, password : string, mail : string, NRN : string, sexe : Sexe,
  actif: number, role : Roles)
  {
    this.nom = nom;
    this.prenom = prenom;
    this.mail = mail;
    this.NRN = NRN;
    this.sexe = sexe;

    this.password = password
    this.actif = actif;
    this.role = role;
    this.actif = actif;
  }
}
