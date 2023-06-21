import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Formations} from "../../../models/formations";
import {ThemePalette} from "@angular/material/core";
import {ErrorTypeFormation, ErrorTypeSyllabus, ErrorTypeUtilisateur} from "../../../shared/utilities/error.enum";
import {MaxSizeValidator} from "@angular-material-components/file-input";

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
  multiple: boolean = false;
  maxSize= 10000;

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
      fichier: new FormControl(null,[Validators.required, MaxSizeValidator(this.maxSize*1024)])
    })
  }

  effacerFichier() {
    this.syllabusFormGroup.controls['fichier'].setValue(null);
  }

  getErrorTitre()
  {
    return this.syllabusFormGroup.controls['nom'].hasError('required') ? ErrorTypeSyllabus.SYLLABUS_TITRE_EMPTY :
      this.syllabusFormGroup.controls['nom'].hasError('minlength') ? ErrorTypeSyllabus.SYLLABUS_TITRE_LENGTH :
        this.syllabusFormGroup.controls['nom'].hasError('maxlength') ? ErrorTypeSyllabus.SYLLABUS_TITRE_LENGTH :
            '';
  }

  getErrorMessageFichier()
  {
    return this.syllabusFormGroup.controls['fichier'].hasError('required') ? ErrorTypeSyllabus.SYLLABUS_FICHIER_EMPTY :
      this.syllabusFormGroup.controls['fichier'].hasError('minlength') ? ErrorTypeSyllabus.SYLLABUS_FICHIER_TAILLE :
            '';
  }

}
