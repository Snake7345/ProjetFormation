import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Formations} from "../../models/formations";
import {ThemePalette} from "@angular/material/core";
import {ErrorTypeFormation, ErrorTypeSyllabus} from "../../shared/utilities/error.enum";

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

  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;


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
      fichier: new FormControl('',[Validators.required])
    })
  }

  getErrorMessageFichier()
  {
    return this.syllabusFormGroup.controls['fichier'].hasError('required') ? ErrorTypeSyllabus.SYLLABUS_FICHIER_EMPTY :
      '';
  }
}
