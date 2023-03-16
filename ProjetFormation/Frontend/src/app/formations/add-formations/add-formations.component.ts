import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Roles} from "../../models/role";
import {Formations} from "../../models/formations";
import {Categories} from "../../models/categories";
import {RolesService} from "../../services/roles/roles.service";
import {CategoriesService} from "../../services/categories/categories.service";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {Utilisateurs} from "../../models/utilisateurs";

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
  ) { }

  public formationFormGroup! : FormGroup

  listeVide = undefined;

  formations: Formations[] = []

  categories : Categories[] = []

  utilisateurs : Utilisateurs[] = []

  afficherCategorie(): void {
    this.categorieservice.liste().subscribe(
      (data) => {
        this.categories = data;
        console.log("affichage categorie : ", this.categories)
        this.listeVide = undefined;
        console.log(this.categories)
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
        console.log("affichage utilisateurs : ", this.utilisateurs)
        this.listeVide = undefined;
        console.log(this.utilisateurs)
      },
      (err) => {
        this.listeVide = err.error.message;
      }
    );
  }

  ngOnInit(): void {
    this.formationFormGroup = new FormGroup({
      nom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(150)]),
      infos:new FormControl('', [Validators.maxLength(150)]),
      dateLimiteInscription:new FormControl('', [Validators.required,]),
      dateQuestionnaire:new FormControl('', [Validators.required,]),
      heureQuestionnaire:new FormControl('', [Validators.required,]),
      heureLimiteInscription:new FormControl('', [Validators.required,]),
      categorie:new FormControl('', [Validators.required,]),
      utilisateur:new FormControl('', [Validators.required,])
    })
    this.afficherCategorie()
    this.afficherUtilisateur()

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

  onCreate() {
    this._router.navigate(["tableFormations"])
  }
}
