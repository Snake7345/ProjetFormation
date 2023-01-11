import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-utilisateurs',
  templateUrl: './update-utilisateurs.component.html',
  styleUrls: ['./update-utilisateurs.component.scss']
})
export class UpdateUtilisateursComponent {
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }

  Submit() {
    this._router.navigate(["tableUtilisateurs"])
  }
}
