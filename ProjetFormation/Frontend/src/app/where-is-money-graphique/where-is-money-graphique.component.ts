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

  selectedValue: number | undefined;

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
    this.projetsLabos = []
    // On charge les valeurs a partir du moment où l'utilisateur a selectionné sa donnée
    this.isloading = true;
    console.log("j'ai selectionné : " + this.selectedValue)

    this.projetsLaboService.findbyAnnee(this.selectedValue).subscribe(
      {
        next: (data) => {
          this.isloading = false;
          this.projetsLabos = data;
          console.log(data)
          console.log(this.projetsLabos);
          //Affichage des valeurs
          this.projetsLabos.forEach(element => console.log(element));
          //Parcours du tableau de base et transfert des données utiles dans un tableau
          this.projetsLabos.forEach((element, index) => {
              this.projetData.push({
                name: element.nom,
                value: element.FK_idValeursLabo.valeur
              });
              this.listeVide = undefined;
              console.log(this.projetData)
          })
        },
        error: (err) => {
          this.listeVide = err.error.message
        }
      })
  }
}
