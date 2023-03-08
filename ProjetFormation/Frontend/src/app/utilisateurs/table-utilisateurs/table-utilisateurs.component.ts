import {Component, OnInit} from '@angular/core';
import {Categories} from "../../models/categories";
import {CategoriesService} from "../../services/categories/categories.service";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {Utilisateurs} from "../../models/utilisateurs";

@Component({
  selector: 'app-table-utilisateurs',
  templateUrl: './table-utilisateurs.component.html',
  styleUrls: ['./table-utilisateurs.component.scss']
})
export class TableUtilisateursComponent implements OnInit {

  utilisateurs: Utilisateurs[] = [];

  listeVide = undefined;

  constructor(private utilisateurService: UtilisateursService) {
  }

  ngOnInit(): void {
    this.afficherUtilisateurs();
  }

  afficherUtilisateurs(): void {
    this.utilisateurService.liste().subscribe(
      (data) => {
        this.utilisateurs = data;
        console.log("affichage:" , data)
        this.listeVide = undefined;
      },
      (err) => {
        this.listeVide = err.error.message;
      }
    );
  }
}
