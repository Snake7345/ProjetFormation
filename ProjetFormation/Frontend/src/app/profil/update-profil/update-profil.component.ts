import {Component} from '@angular/core';
import {ISexe} from "../../shared/interfaces/ISexe";
import {Roles} from "../../models/role";
import {Utilisateurs} from "../../models/utilisateurs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {RolesService} from "../../services/roles/roles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ErrorTypeUtilisateur} from "../../shared/utilities/error.enum";

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.scss']
})
export class UpdateProfilComponent
{
  actif : number = 1;
  sexes: ISexe[] = [
    {value: 'x', viewValue: 'X'},
    {value: 'feminin', viewValue: 'Féminin'},
    {value: 'masculin', viewValue: 'Masculin'},
  ];

  roles: Roles[] = [];

  utilisateur! : Utilisateurs;

  listeVide = undefined;

  selectedRole! :number | undefined;

  public utilisateurFormGroup! : FormGroup;

  constructor(
    private utilisateurService : UtilisateursService,

    private roleservice : RolesService,
    private activatedRoute: ActivatedRoute,
    private toastr : ToastrService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.utilisateurFormGroup = new FormGroup({
      nom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100)]),
      prenom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100)]),
      mail:new FormControl('', [Validators.required,
        Validators.minLength(4), Validators.maxLength(100),
        Validators.pattern(
          "[a-z0-9!#$%&’*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
        )]),
      password:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100)]),
      sexe:new FormControl('', [Validators.required,]),
    })
    const id = this.activatedRoute.snapshot.params['id'];
    this.utilisateurService.detail(id).subscribe(
      data => {
        this.selectedRole = data.role.idRoles
        this.utilisateur = {
          idUtilisateur:data.idUtilisateur,
          nom:data.nom,
          prenom: data.prenom,
          NRN: data.NRN,
          sexe: data.sexe,
          role : data.role,
          password : data.password,
          mail : data.mail,
          actif:data.actif,
        }
        console.log("affichage utilisateur",this.utilisateur)
        //TODO : Erreur ne récupère pas la donnée dans le formulaire
        this.utilisateurFormGroup.patchValue(
          this.utilisateur
        );
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this._router.navigate(['homepage']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log("utilisateur envoyé : ", this.utilisateur)
    this.utilisateurService.update(id, this.utilisateur).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this._router.navigate(['tableUtilisateurs']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  public updateData(): void
  {
    this.utilisateur.nom=this.utilisateurFormGroup.get("nom")?.value
    this.utilisateur.prenom=this.utilisateurFormGroup.get("prenom")?.value
    this.utilisateur.mail=this.utilisateurFormGroup.get("mail")?.value
    this.utilisateur.NRN=this.utilisateurFormGroup.get("NRN")?.value
    this.utilisateur.password=this.utilisateurFormGroup.get("password")?.value
    this.utilisateur.sexe=this.utilisateurFormGroup.get("sexe")?.value
  }

  retour() {
    this._router.navigate([""])
  }

  /*Gestion des erreurs : */

  getErrorMessageNom()
  {
    return this.utilisateurFormGroup.controls['nom'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_NOM_EMPTY :
      this.utilisateurFormGroup.controls['nom'].hasError('minlength') ? ErrorTypeUtilisateur.UTILISATEUR_NOM_LENGTH :
        this.utilisateurFormGroup.controls['nom'].hasError('maxlength') ? ErrorTypeUtilisateur.UTILISATEUR_NOM_LENGTH :
          '';
  }

  getErrorMessagePrenom()
  {
    return this.utilisateurFormGroup.controls['prenom'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_PRENOM_EMPTY :
      this.utilisateurFormGroup.controls['prenom'].hasError('minlength') ? ErrorTypeUtilisateur.UTILISATEUR_PRENOM_LENGTH :
        this.utilisateurFormGroup.controls['prenom'].hasError('maxlength') ? ErrorTypeUtilisateur.UTILISATEUR_PRENOM_LENGTH :
          '';
  }

  getErrorMessageMail()
  {
    return this.utilisateurFormGroup.controls['mail'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_MAIL_EMPTY :
      this.utilisateurFormGroup.controls['mail'].hasError('minlength') ? ErrorTypeUtilisateur.UTILISATEUR_MAIL_LENGTH :
        this.utilisateurFormGroup.controls['mail'].hasError('maxlength') ? ErrorTypeUtilisateur.UTILISATEUR_MAIL_LENGTH :
          this.utilisateurFormGroup.controls['mail'].hasError('pattern') ? ErrorTypeUtilisateur.UTILISATEUR_MAIL_FORMAT :
            '';
  }

  getErrorMessageSexe()
  {
    return this.utilisateurFormGroup.controls['sexe'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_SEXE_EMPTY :
      '';
  }

  getErrorMessagePassword()
  {
    return this.utilisateurFormGroup.controls['password'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_PASSWORD_EMPTY :
      this.utilisateurFormGroup.controls['password'].hasError('minlength') ? ErrorTypeUtilisateur.UTILISATEUR_PASSWORD_LENGTH :
        this.utilisateurFormGroup.controls['password'].hasError('maxlength') ? ErrorTypeUtilisateur.UTILISATEUR_PASSWORD_LENGTH :
          '';
  }

  getErrorMessageNRN() {
    return this.utilisateurFormGroup.controls['NRN'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_NRN_EMPTY :
      this.utilisateurFormGroup.controls['NRN'].hasError('pattern') ? ErrorTypeUtilisateur.UTILISATEUR_NRN_NUMBER :
        this.utilisateurFormGroup.controls['NRN'].hasError('minlength') ? ErrorTypeUtilisateur.UTILISATEUR_NRN_LENGTH :
          this.utilisateurFormGroup.controls['NRN'].hasError('maxlength') ? ErrorTypeUtilisateur.UTILISATEUR_NRN_LENGTH :
            '';
  }
}
