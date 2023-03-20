import {Component, OnInit} from '@angular/core';
import {Categories} from "../../models/categories";
import {CategoriesService} from "../../services/categories/categories.service";
import Swal from "sweetalert2";
import {UtilisateursActivDesactiv} from "../../models/otherModels/utilisateursActivDesactiv";
import {CategoriesActivDesactiv} from "../../models/otherModels/categoriesActivDesactiv";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.scss']
})
export class TableCategoriesComponent implements OnInit{

  categories: Categories[] = [];
  listeVide = undefined;
  constructor(private categorieService: CategoriesService,
  private toastr : ToastrService,
  private _router : Router,
  ) {}

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

  onUpdate(id: number | undefined, actif : number): void
  {
    Swal.fire({
      title: 'Confirmation ?',
      text: 'êtes vous sur de vouloir désactiver/réactiver la catégorie ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        if(actif == 1)
        {
          actif = 0;
        }
        else
        {
          actif = 1;
        }
        const categorie = new CategoriesActivDesactiv(id,actif)
        this.categorieService.activdesactiv(id, categorie).subscribe(
          data => {
            this.toastr.success(data.message, 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this._router.navigate(['tableCategories']);
            this.afficherCategories();
            Swal.fire(
              'OK',
              'Catégorie activé/désactivé',
              'success'
            );
          },

          err => {
            this.toastr.error(err.error.message, 'Fail', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'L\'action a été annulé',
          'error'
        );
      }
    });
  }

}
