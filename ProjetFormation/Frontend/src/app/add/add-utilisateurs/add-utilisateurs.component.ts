import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-utilisateurs',
  templateUrl: './add-utilisateurs.component.html',
  styleUrls: ['./add-utilisateurs.component.scss'],
})
export class AddUtilisateursComponent {
  /*emailFormControl = new FormControl('', [Validators.required, Validators.email]);*/
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }

  Submit() {
    this._router.navigate(["tableUtilisateurs"])
  }
}
