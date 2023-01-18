import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss'],
})
export class UpdateCategoriesComponent implements OnInit {
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  denominationFormControl = new FormControl('', [Validators.required]);
  Submit() {
    this._router.navigate(["tableCategories"])
  }
}