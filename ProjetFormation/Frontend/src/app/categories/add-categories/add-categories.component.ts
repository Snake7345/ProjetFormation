import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {CategoriesService} from "../../services/categories/categories.service";
import {ToastrService} from "ngx-toastr";
import {Categories} from "../../models/categories";

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss'],
})
export class AddCategoriesComponent implements OnInit {

  nom = '';
  actif : number = 1;

  constructor(

    private categorieService : CategoriesService,

    private toastr : ToastrService,
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  denominationFormControl = new FormControl('', [Validators.required]);


  onCreate() : void
  {
    const categorie = new Categories(this.nom, this.actif);
    this.categorieService.save(categorie).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this._router.navigate(['tablecategories']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
  retour() {
    this._router.navigate(["tablecategories"])
  }
}
