import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Formations} from "../../models/formations";
import {Categories} from "../../models/categories";
import {CategoriesService} from "../../services/categories/categories.service";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {Utilisateurs} from "../../models/utilisateurs";
import {FormationsService} from "../../services/formations/formations.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-formations',
  templateUrl: './add-formations.component.html',
  styleUrls: ['./add-formations.component.scss'],
})
export class AddFormationsComponent implements OnInit {
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router,

    private categorieservice : CategoriesService,

    private utilisateurservice : UtilisateursService,
    private toastr : ToastrService,

    private formationservice : FormationsService,
  ) { }

  actif : number = 1;
  public formationFormGroup! : FormGroup

  listeVide = undefined;

  formations: Formations[] = []

  categories : Categories[] = []

  utilisateurs : Utilisateurs[] = []

  afficherCategorie(): void {
    this.categorieservice.liste().subscribe(
      (data) => {
        this.categories = data;
        this.listeVide = undefined;
      },
      (err) => {
        this.listeVide = err.error.message;
      }
    );
  }

  afficherUtilisateur(): void {
    this.utilisateurservice.liste().subscribe(
      (data) => {
        this.utilisateurs = data;
        this.listeVide = undefined;
      },
      (err) => {
        this.listeVide = err.error.message;
      }
    );
  }

  ngOnInit(): void {
    this.afficherCategorie()
    this.afficherUtilisateur()
    this.formationFormGroup = new FormGroup({
      nom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(150)]),
      infos:new FormControl('', [Validators.maxLength(150)]),
      dateheureLimiteInscription:new FormControl('', [Validators.required,]),
      dateheureQuestionnaire:new FormControl('', [Validators.required,]),
      categorie:new FormControl('', [Validators.required,]),
      utilisateur:new FormControl('', [Validators.required,])
    })
  }

  onCreate() : void
  {
    if(this.formationFormGroup.invalid) return
    const formation = new Formations(this.formationFormGroup.value.nom,
      this.formationFormGroup.value.infos,
      this.actif,
      this.formationFormGroup.value.dateheureQuestionnaire,
      this.formationFormGroup.value.dateheureLimiteInscription,this.formationFormGroup.value.categorie,
      this.formationFormGroup.value.utilisateur,);
    this.formationservice.save(formation).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this._router.navigate(['tableFormations']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  retour() {
    this._router.navigate(["tableFormations"])
  }

  getErrorMessageCategorie()
  {
    return this.formationFormGroup.controls['categorie'].hasError('required') ? ' La categorie de la formation est requise' :
      '';
  }

  getErrorMessageUtilisateur()
  {
    return this.formationFormGroup.controls['utilisateur'].hasError('required') ? ' Le responsable de la formation est requis' :
      '';
  }

  getErrorMessageDateQuestionnaire()
  {
    return this.formationFormGroup.controls['dateQuestionnaire'].hasError('required') ? ' La date du questionnaire est requise' :
      '';
  }
  getErrorMessageHeureQuestionnaire()
  {
    return this.formationFormGroup.controls['heureQuestionnaire'].hasError('required') ? ' L\'heure du questionnaire est requis' :
      '';
  }

  getErrorMessageNom()
  {
    return this.formationFormGroup.controls['nom'].hasError('required') ? ' Le nom de la formation est requis' :
      this.formationFormGroup.controls['nom'].hasError('minlength') ? 'La longueur doit être entre 2 et 150 caractères.' :
        this.formationFormGroup.controls['nom'].hasError('maxlength') ? 'La longueur doit être entre 2 et 100 caractères.' :
          '';
  }
  getErrorMessageInfos()
  {
    return this.formationFormGroup.controls['infos'].hasError('maxlength') ? ' Les infos sont limités à 1000 caractères' :
          '';
  }

  getErrorMessageDateLimiteInscription()
  {
    return this.formationFormGroup.controls['dateLimiteInscription'].hasError('required') ? ' La date limite d\'inscription est requise' :
          '';
  }

  getErrorMessageHeureLimiteInscription()
  {
    return this.formationFormGroup.controls['heureLimiteInscription'].hasError('required') ? ' L\'heure limite de l\'inscription est requise' :
      '';
  }
}
