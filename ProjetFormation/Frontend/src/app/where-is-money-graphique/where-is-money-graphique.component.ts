import {Component, OnInit} from '@angular/core';
import {Projetslabo} from "../models/projetslabo";
import {ProjetslaboService} from "../services/projetslabo/projetslabo";
import {Anneeslabo} from "../models/anneeslabo";
import {AnneeslaboService} from "../services/anneeslabo/anneeslabo";

@Component({
  selector: 'app-where-is-money-graphique',
  templateUrl: './where-is-money-graphique.component.html',
  styleUrls: ['./where-is-money-graphique.component.scss']
})
export class WhereIsMoneyGraphiqueComponent implements OnInit{

  projetsLabos: Projetslabo[] = [];

  anneeLabos : Anneeslabo[] = []
  selectedValue: string | undefined;
  listeVide = undefined;
  constructor(private projetsLaboService: ProjetslaboService, private anneesLaboService : AnneeslaboService) {}

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

  afficherProjets(): void {
    this.projetsLaboService.liste().subscribe(
      (data) => {
        this.projetsLabos = data;
        this.listeVide = undefined;
        console.log(this.projetsLabos)
      },
      (err) => {
        this.listeVide = err.error.message;
      }

    );
  }

}
