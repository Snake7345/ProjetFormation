import { Component } from '@angular/core';
import {Projetslabo} from "../models/projetslabo";
import {ProjetslaboService} from "../services/projetslabo/projetslabo";

@Component({
  selector: 'app-where-is-money',
  templateUrl: './where-is-money.component.html',
  styleUrls: ['./where-is-money.component.scss']
})
export class WhereIsMoneyComponent {
  projetsLabos: Projetslabo[] = [];

  listeVide = undefined;
  constructor(private projetsLaboService: ProjetslaboService) {}

  ngOnInit(): void {
    this.afficherProjets();
  }

  afficherProjets(): void {
    this.projetsLaboService.liste().subscribe(
      (data) => {
        this.projetsLabos = data;
        this.listeVide = undefined;
      },
      (err) => {
        this.listeVide = err.error.message;
      }
    );
  }
}
