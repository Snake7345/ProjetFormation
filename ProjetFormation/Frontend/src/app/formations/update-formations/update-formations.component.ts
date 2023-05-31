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
import {ErrorTypeFormation} from "../../shared/utilities/error.enum";

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

  date! : Date;

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
    // Définir les validateurs lors du changement de valeur des champs dateheureQuestionnaire et dateheureLimiteInscription
    this.formationFormGroup.get('dateheureLimiteInscription')?.valueChanges.subscribe(() => {
      this.updateDateLimiteInscriptionValidator();
    });
    this.formationFormGroup.get('dateheureQuestionnaire')?.valueChanges.subscribe(() => {
      this.updateDateLimiteInscriptionValidator();
    });
    const id = this.activatedRoute.snapshot.params['id'];
    this.formationservice.detail(id).subscribe(
      data => {
        this.selectedCat = data.categories.idCategories
        this.selectedUser = data.utilisateurs.idUtilisateurs
        this.formation = {
          idFormations:data.idFormations,
          nom:data.nom,
          infos: data.infos,
          statut:data.statut,
          dateheureLimiteInscription  : data.dateheureLimiteInscription,
          dateheureQuestionnaire: data.dateheureQuestionnaire,
          categories : data.categories,
          utilisateurs : data.utilisateurs,
          disponibilite : data.disponibilite,

        }
        console.log(this.formation);
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

  updateDateLimiteInscriptionValidator() {
    const dateLimiteInscription = this.formationFormGroup.get('dateheureLimiteInscription');
    const dateQuestionnaire = this.formationFormGroup.get('dateheureQuestionnaire');

    if (dateLimiteInscription && dateQuestionnaire) {
      const dateLimiteValue = dateLimiteInscription.value;
      const dateQuestionnaireValue = dateQuestionnaire.value;

      if (dateLimiteValue > dateQuestionnaireValue) {
        dateLimiteInscription.setErrors({ dateInvalid: true });
        dateQuestionnaire.setErrors({ dateInvalid: true });
      } else {
        // Si les dates sont valides, supprimez les erreurs
        if (dateLimiteInscription.hasError('dateInvalid')) {
          dateLimiteInscription.setErrors(null);
        }
        if (dateQuestionnaire.hasError('dateInvalid')) {
          dateQuestionnaire.setErrors(null);
        }
      }
    }
  }

  public updateData(): void
  {
    this.formation.nom=this.formationFormGroup.get("nom")?.value
    this.formation.infos=this.formationFormGroup.get("infos")?.value
    this.formation.dateheureLimiteInscription=this.formationFormGroup.get("dateheureLimiteInscription")?.value
    this.formation.dateheureQuestionnaire=this.formationFormGroup.get("dateheureQuestionnaire")?.value
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

  getErrorMessageDateLimiteInscription() {
    const dateLimiteControl = this.formationFormGroup.get('dateheureLimiteInscription');
    const dateQuestionnaireControl = this.formationFormGroup.get('dateheureQuestionnaire');

    if (dateLimiteControl && dateQuestionnaireControl) {
      if (dateLimiteControl.hasError('dateInvalid')) {
        return ErrorTypeFormation.FORMATION_QUESTIONNAIRE_BEFORE_INSCRIPTION;
      }
      if (dateLimiteControl.hasError('required')) {
        return ErrorTypeFormation.FORMATION_DATEHEUREINSCRIPTION_EMPTY;
      }
    }

    return '';
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
