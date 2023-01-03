import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-formations',
  templateUrl: './update-formations.component.html',
  styleUrls: ['./update-formations.component.scss']
})
export class UpdateFormationsComponent {
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }

  Submit() {
    this._router.navigate(["tableFormations"])
  }

}
