import {Component, OnInit} from '@angular/core';
import {Projetslabo} from "../models/projetslabo";
import {ProjetslaboService} from "../services/projetslabo/projetslabo";
import {Anneeslabo} from "../models/anneeslabo";
import {AnneeslaboService} from "../services/anneeslabo/anneeslabo";
import {IProjet} from "./IProjet";

@Component({
  selector: 'app-where-is-money-graphique',
  templateUrl: './where-is-money-graphique.component.html',
  styleUrls: ['./where-is-money-graphique.component.scss']
})
export class WhereIsMoneyGraphiqueComponent implements OnInit {

  ngOnInit(): void {
    this.afficherAnnees();

  }

  projetData: IProjet[] = []

  projetsLabos: Projetslabo[] = [];
  anneeLabos: Anneeslabo[] = []

  listeVide = undefined;

  selectedValue: string | undefined;

  isloading: boolean = true;


  constructor(private projetsLaboService: ProjetslaboService, private anneesLaboService: AnneeslaboService) {
  }



  afficherAnnees(): void {
    this.anneesLaboService.liste().subscribe(
      (data) => {
        this.anneeLabos = data;
        this.listeVide = undefined;
        console.log(this.projetsLabos)
      },
      (err) => {
        this.listeVide = err.error.message;
      }
    );
  }

  afficherProjets() {
    //On vide notre tableau
    this.projetData = []
    // On charge les valeurs a partir du moment où l'utilisateur a selectionné sa donnée
    this.isloading = true;
    this.projetsLaboService.liste().subscribe(
      {
        next: (data) => {
          this.isloading = false;
          this.projetsLabos = data;
          //Affichage des valeurs
          //this.projetsLabos.forEach(element => console.log(element));
          /*Parcours du tableau de base et quand l'année est égale à selectedValue, on le met dans le tableau projetdata*/
          this.projetsLabos.forEach((element, index) => {
            if (element.FK_idAnneesLabo.annee.toString() == this.selectedValue) {
              this.projetData.push({
                name: element.nom,
                value: element.FK_idValeursLabo.valeur
              });
              this.listeVide = undefined;
              console.log(this.projetData)
            }
          })

        },
        error: (err) => {
          this.listeVide = err.error.message
        }
      })
  }
}
