import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-questions',
  templateUrl: './update-questions.component.html',
  styleUrls: ['./update-questions.component.scss']
})
export class UpdateQuestionsComponent {
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }

  Submit() {
    this._router.navigate(["tableQuestions"])
  }
}
