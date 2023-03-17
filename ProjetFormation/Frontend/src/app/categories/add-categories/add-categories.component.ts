import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  actif : number = 1;

  public categorieFormGroup! : FormGroup

  constructor(

    private categorieService : CategoriesService,

    private toastr : ToastrService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.categorieFormGroup = new FormGroup({
      nom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100)])
    })
  }
  errorMessageNom()
  {
    return this.categorieFormGroup.controls['nom'].hasError('required') ? ' La dénomination de la catégorie est requise.' :
      this.categorieFormGroup.controls['nom'].hasError('minlength') ? 'La longueur doit être entre 2 et 100 caracteres.' :
        this.categorieFormGroup.controls['nom'].hasError('maxlength') ? 'La longueur doit être entre 2 et 100 caractères.' :
          '';
  }


  onCreate() : void
  {
    if(this.categorieFormGroup.invalid) return
    const categorie = new Categories(this.categorieFormGroup.value.nom, this.actif);
    console.log(categorie)
    this.categorieService.save(categorie).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this._router.navigate(['tableCategories']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
  retour() {
    this._router.navigate(["tableCategories"])
  }


  /* 2eme solution
  get errorMessage(): string {
    const form: FormControl = (this.denominationFormGroup.get('nom') as FormControl);
    return form.hasError('required') ?
      'La dénomination de la catégorie est requise' :
      form.hasError('maxlength') ?
        'La longueur doit être entre 2 et 100 caractères' :
        form.hasError('minlength') ?
          'La longueur doit être entre 2 et 100 caractères' : '';
  }*/
}
