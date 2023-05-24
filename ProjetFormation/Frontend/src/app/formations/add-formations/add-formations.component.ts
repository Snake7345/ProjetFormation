import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Formations} from "../../models/formations";
import {Categories} from "../../models/categories";
import {CategoriesService} from "../../services/categories/categories.service";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {Utilisateurs} from "../../models/utilisateurs";
import {FormationsService} from "../../services/formations/formations.service";
import {ToastrService} from "ngx-toastr";
import {ErrorTypeFormation} from "../../shared/utilities/error.enum";

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

  afficherUtilisateurProf(): void {
    this.utilisateurservice.listeByID(1).subscribe(
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
    this.afficherUtilisateurProf()
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
      this.formationFormGroup.value.dateheureLimiteInscription,
      this.formationFormGroup.value.dateheureQuestionnaire,this.formationFormGroup.value.categorie,
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
    return this.formationFormGroup.controls['categorie'].hasError('required') ? ErrorTypeFormation.FORMATION_CATEGORIE_EMPTY :
      '';
  }

  getErrorMessageUtilisateur()
  {
    return this.formationFormGroup.controls['utilisateur'].hasError('required') ? ErrorTypeFormation.FORMATION_UTILISATEUR_EMPTY :
      '';
  }

  getErrorMessageDateHeureQuestionnaire()
  {
    return this.formationFormGroup.controls['dateheureQuestionnaire'].hasError('required') ? ErrorTypeFormation.FORMATION_DATEHEUREQUESTIONNAIRE_EMPTY :
      '';
  }
  getErrorMessageDateHeureLimiteInscription()
  {
    return this.formationFormGroup.controls['dateheureLimiteInscription'].hasError('required') ? ErrorTypeFormation.FORMATION_DATEHEUREINSCRIPTION_EMPTY :
      '';
  }

  getErrorMessageNom()
  {
    return this.formationFormGroup.controls['nom'].hasError('required') ? ErrorTypeFormation.FORMATION_NOM_EMPTY :
      this.formationFormGroup.controls['nom'].hasError('minlength') ? ErrorTypeFormation.FORMATION_NOM_LENGTH :
        this.formationFormGroup.controls['nom'].hasError('maxlength') ? ErrorTypeFormation.FORMATION_NOM_LENGTH :
          '';
  }
  getErrorMessageInfos()
  {
    return this.formationFormGroup.controls['infos'].hasError('maxlength') ? ErrorTypeFormation.FORMATION_INFOS_LENGTH :
          '';
  }
}
