import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {CategoriesService} from "../../../services/categories/categories.service";
import {ToastrService} from "ngx-toastr";
import {Categories} from "../../../models/categories";
import {ErrorTypeCategorie} from "../../../shared/utilities/error.enum";

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
    return this.categorieFormGroup.controls['nom'].hasError('required') ? ErrorTypeCategorie.CATEGORIE_DENOMINATION_EMPTY :
      this.categorieFormGroup.controls['nom'].hasError('minlength') ? ErrorTypeCategorie.CATEGORIE_LENGTH :
        this.categorieFormGroup.controls['nom'].hasError('maxlength') ? ErrorTypeCategorie.CATEGORIE_LENGTH :
          '';
  }


  onCreate() : void
  {
    if(this.categorieFormGroup.invalid) return
    const categorie = new Categories(this.categorieFormGroup.value.nom, this.actif);
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

}
