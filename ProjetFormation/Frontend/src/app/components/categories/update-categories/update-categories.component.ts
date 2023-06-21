import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Categories} from "../../../models/categories";
import {CategoriesService} from "../../../services/categories/categories.service";
import {ErrorTypeCategorie} from "../../../shared/utilities/error.enum";

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss'],
})
export class UpdateCategoriesComponent implements OnInit {

  public categorieFormGroup! : FormGroup

  /*! = devant une variable il sera initialisé plus tard
  * ? = il peut valoir quelque chose ou null*/
  categorie!: Categories;

  constructor(
    private categorieService : CategoriesService,
    private toastr: ToastrService,

    private activatedRoute: ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.categorieFormGroup = new FormGroup({
      nom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100)])
    })
    const id = this.activatedRoute.snapshot.params['id'];
    this.categorieService.detail(id).subscribe(
      data => {
        this.categorie = {
          idCategories:data.idCategories,
          nom:data.nom,
          actif:data.actif
        }
        this.categorieFormGroup.patchValue(
          this.categorie
        );
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this._router.navigate(['/']);
      }
    );
  }

  errorMessageNom()
  {
    return this.categorieFormGroup.controls['nom'].hasError('required') ? ErrorTypeCategorie.CATEGORIE_DENOMINATION_EMPTY :
      this.categorieFormGroup.controls['nom'].hasError('minlength') ? ErrorTypeCategorie.CATEGORIE_LENGTH :
        this.categorieFormGroup.controls['nom'].hasError('maxlength') ? ErrorTypeCategorie.CATEGORIE_LENGTH :
          '';
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.categorieFormGroup.controls[controlName].hasError(errorName);
  }

  public updateData(): void
  {
    //this.categorie.idCategories=this.categorieFormGroup.get("idCategories")?.value
    this.categorie.nom=this.categorieFormGroup.get("nom")?.value
    //this.categorie.actif=this.categorieFormGroup.get("actif")?.value
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.categorieService.update(id, this.categorie).subscribe(
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


