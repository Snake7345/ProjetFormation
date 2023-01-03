import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-syllabus',
  templateUrl: './update-syllabus.component.html',
  styleUrls: ['./update-syllabus.component.scss']
})
export class UpdateSyllabusComponent {
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }

  Submit() {
    this._router.navigate(["tableSyllabus"])
  }
}
