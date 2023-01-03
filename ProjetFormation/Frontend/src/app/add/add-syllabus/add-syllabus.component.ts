import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-syllabus',
  templateUrl: './add-syllabus.component.html',
  styleUrls: ['./add-syllabus.component.scss']
})
export class AddSyllabusComponent {
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }
}
