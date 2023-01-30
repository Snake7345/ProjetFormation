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

  projetData: IProjet[] = []

  projetsLabos: Projetslabo[] = [];
  anneeLabos: Anneeslabo[] = []

  listeVide = undefined;

  selectedValue: string | undefined;

  isloading: boolean = true;

  yLabel = "Millions d\'euros"

  constructor(private projetsLaboService: ProjetslaboService, private anneesLaboService: AnneeslaboService) {
  }

  ngOnInit(): void {
    this.afficherAnnees();
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
    this.isloading
    this.projetsLaboService.liste().subscribe(
      {
        next: (data) => {
          this.isloading = false;
          this.projetsLabos = data;
          //Affichage des valeurs
          //this.projetsLabos.forEach(element => console.log(element));
          /*Parcours du tableau et suppression des éléments dont l'année n'estp as égale à selectedValue*/
          this.projetsLabos.forEach((element, index) => {
            if (element.FK_idAnneesLabo.annee.toString() == this.selectedValue) {
              //this.projetsLabos.splice(index,1);
              this.projetData.push({
                name: element.nom,
                value: element.FK_idValeursLabo.valeur
              });
              //console.log(this.projetsLabos)
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
