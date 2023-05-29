import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Formations} from "../../models/formations";

@Component({
  selector: 'app-add-syllabus',
  templateUrl: './add-syllabus.component.html',
  styleUrls: ['./add-syllabus.component.scss']
})
export class AddSyllabusComponent implements OnInit {
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router,
    private toastr : ToastrService,
  ) { }
  public syllabusFormGroup! : FormGroup

  onCreate() : void
  {
    console.log("Miaou")
  }

  retour() {
    this._router.navigate(["tableFormations"])
  }

  ngOnInit(): void {
    this.syllabusFormGroup = new FormGroup({
      nom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(150)]),
      fichier: new FormControl('')
    })
  }
}
