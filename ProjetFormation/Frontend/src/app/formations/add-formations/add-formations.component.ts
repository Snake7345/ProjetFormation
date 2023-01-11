import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-formations',
  templateUrl: './add-formations.component.html',
  styleUrls: ['./add-formations.component.scss'],
})
export class AddFormationsComponent implements OnInit {

  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  nomFormControl = new FormControl('', [Validators.required]);
  infosFormControl = new FormControl('');
  dateLimiteInscriptionFormControl = new FormControl('', [Validators.required]);
  dateQuestionnaireFormControl = new FormControl('', [Validators.required]);

  Submit() {
    this._router.navigate(["tableFormations"])
  }
}
