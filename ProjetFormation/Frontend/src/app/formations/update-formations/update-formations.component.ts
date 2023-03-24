import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../../services/categories/categories.service";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {ToastrService} from "ngx-toastr";
import {FormationsService} from "../../services/formations/formations.service";
import {Formations} from "../../models/formations";
import {Categories} from "../../models/categories";
import {Utilisateurs} from "../../models/utilisateurs";
import {Time} from "@angular/common";

@Component({
  selector: 'app-update-formations',
  templateUrl: './update-formations.component.html',
  styleUrls: ['./update-formations.component.scss']
})
export class UpdateFormationsComponent {
  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router,

    private categorieservice : CategoriesService,

    private utilisateurservice : UtilisateursService,
    private toastr : ToastrService,
    private activatedRoute: ActivatedRoute,

    private formationservice : FormationsService,
  ) { }

  actif : number = 1;
  public formationFormGroup! : FormGroup

  listeVide = undefined;

  categories : Categories[] = []

  utilisateurs : Utilisateurs[] = []

  selectedUser! :number | undefined;

  selectedCat! :number | undefined;

  formation! : Formations;

  str1! : string;

  date! : Date;

  ngOnInit(): void {
    this.afficherCategorie()
    this.afficherUtilisateur()
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
    const id = this.activatedRoute.snapshot.params['id'];
    this.formationservice.detail(id).subscribe(
      data => {
        this.selectedCat = data.categories.idCategories
        this.selectedUser = data.utilisateurs.idUtilisateur
        this.formation = {
          idFormations:data.idFormations,
          nom:data.nom,
          infos: data.infos,
          heureQuestionnaire: data.heureQuestionnaire,
          heureLimiteInscription: data.heureLimiteInscription,
          categories : data.categories,
          utilisateurs : data.utilisateurs,
          actif : data.actif,
          dateLimiteInscription:data.dateLimiteInscription,
          dateQuestionnaire : data.dateQuestionnaire
        }
        this.formationFormGroup.patchValue(
          this.formation
        );
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this._router.navigate(['/']);
      }
    );
  }

  public updateData(): void
  {
    this.formation.nom=this.formationFormGroup.get("nom")?.value
    this.formation.infos=this.formationFormGroup.get("infos")?.value
    this.formation.heureQuestionnaire=this.formationFormGroup.get("heureQuestionnaire")?.value
    this.formation.heureLimiteInscription=this.formationFormGroup.get("heureLimiteInscription")?.value
    this.date = new Date(this.formationFormGroup.get("dateQuestionnaire")?.value)
    this.date.setHours(5)
    console.log("Date questionnaire : ", this.date)
    this.formation.dateQuestionnaire=this.date
    this.date = new Date(this.formationFormGroup.get("dateLimiteInscription")?.value)
    this.date.setHours(5)
    console.log("Date limite : ", this.date)
    this.formation.dateLimiteInscription=this.date
    this.formation.categories=this.formationFormGroup.get("categorie")?.value
    this.formation.utilisateurs=this.formationFormGroup.get("utilisateur")?.value
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log("formation que j'ai update : ", this.formation)
    this.formationservice.update(id, this.formation).subscribe(
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
