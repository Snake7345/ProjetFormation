import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss'],
})
export class AddCategoriesComponent implements OnInit {


  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  denominationFormControl = new FormControl('', [Validators.required]);

  Submit() {
    console.log("Denomination :")
    this._router.navigate(["tableCategories"])
  }
}
