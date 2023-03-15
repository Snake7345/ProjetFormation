import {Component, OnInit} from '@angular/core';
import {Categories} from "../../models/categories";
import {CategoriesService} from "../../services/categories/categories.service";

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.scss']
})
export class TableCategoriesComponent implements OnInit{

  categories: Categories[] = [];

  listeVide = undefined;
  constructor(private categorieService: CategoriesService) {}

  ngOnInit(): void {
    this.afficherCategories();
  }

  afficherCategories(): void {
    this.categorieService.liste().subscribe(
      (data) => {
        this.categories = data;
        this.listeVide = undefined;
      },
      (err) => {
        this.listeVide = err.error.message;
      }
    );
  }



}
