import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Categories} from "../../models/categories";
import {CategoriesService} from "../../services/categories/categories.service";

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss'],
})
export class UpdateCategoriesComponent implements OnInit {

  public categorieFormGroup = FormGroup

  /*! = devant une variable il sera initialisé plus tard
  * ? = null*/
  categorie!: Categories;

  constructor(

    private categorieService : CategoriesService,
    private toastr: ToastrService,

    private activatedRoute: ActivatedRoute,
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.categorieService.detail(id).subscribe(
      data => {
        this.categorie = data;
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this._router.navigate(['/']);
      }
    );
    this.categorieFormGroup = new FormGroup({
      nom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100)])
    })

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

  public checkError = (controlName: string, errorName: string) => {
    return this.categorieFormGroup.controls[controlName].hasError(errorName);
  }

  retour() {
    this._router.navigate(["tableCategories"])
  }
  /*denominationFormControl = new FormControl('', [Validators.required]);
  Submit() {
    this._router.navigate(["tableCategories"])
  }*/
}


