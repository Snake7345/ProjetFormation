import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UtilisateursService} from "../../../services/utilisateurs/utilisateurs.service";
import {Utilisateurs} from "../../../models/utilisateurs";
import {ISexe} from "../../../shared/interfaces/ISexe";
import {RolesService} from "../../../services/roles/roles.service";
import {Roles} from "../../../models/role";
import {ErrorTypeUtilisateur} from "../../../shared/utilities/error.enum";

@Component({
  selector: 'app-add-utilisateurs',
  templateUrl: './add-utilisateurs.component.html',
  styleUrls: ['./add-utilisateurs.component.scss'],
})
export class AddUtilisateursComponent implements OnInit{

  actif : number = 1;
  sexes: ISexe[] = [
    {value: 'x', viewValue: 'X'},
    {value: 'feminin', viewValue: 'Féminin'},
    {value: 'masculin', viewValue: 'Masculin'},
  ];

  roles: Roles[] = []

  listeVide = undefined;

  public utilisateurFormGroup! : FormGroup

  constructor(
    private utilisateurService : UtilisateursService,

    private roleservice : RolesService,

    private toastr : ToastrService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.utilisateurFormGroup = new FormGroup({
      nom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100), Validators.pattern("^[a-zA-Z]+(?:-[a-zA-Z]+)*$")]),
      prenom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100), Validators.pattern("^[a-zA-Z]+(?:-[a-zA-Z]+)*$")]),
      mail:new FormControl('', [Validators.required,
        Validators.minLength(4), Validators.maxLength(100), Validators.pattern(
          "[a-z0-9!#$%&’*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  )]),
      NRN:new FormControl('', [Validators.required,
        Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$"),]),
      password:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100)]),
      sexe:new FormControl('', [Validators.required,]),
      role:new FormControl('', [Validators.required,])
    })
    this.afficherRole()
  }

  afficherRole(): void {
    this.roleservice.liste().subscribe(
      (data) => {
        this.roles = data;
        this.listeVide = undefined;
        console.log(this.roles)
      },
      (err) => {
        this.listeVide = err.error.message;
      }
    );
  }


  onCreate() : void
  {
    const roleRecup = this.roles.find(x=>x.idRoles== this.utilisateurFormGroup.value.role)!
    if(this.utilisateurFormGroup.invalid) return
    const utilisateur = new Utilisateurs(this.utilisateurFormGroup.value.nom,
      this.utilisateurFormGroup.value.prenom,this.utilisateurFormGroup.value.password,
      this.utilisateurFormGroup.value.mail,this.utilisateurFormGroup.value.NRN,
      this.utilisateurFormGroup.value.sexe,this.actif, roleRecup);
    console.log("Voici mon utilisateur", utilisateur)

    this.utilisateurService.save(utilisateur).subscribe(
      data => {
        this.toastr.success(data.message, 'Ok', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this._router.navigate(['tableUtilisateurs']);
      },
      err => {
        this.toastr.error(err.error.message, "Fail", {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  retour() {
    this._router.navigate(["tableUtilisateurs"])
  }

  /*Gestion des erreurs : */

  getErrorMessageNom()
  {
    return this.utilisateurFormGroup.controls['nom'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_NOM_EMPTY :
      this.utilisateurFormGroup.controls['nom'].hasError('minlength') ? ErrorTypeUtilisateur.UTILISATEUR_NOM_LENGTH :
        this.utilisateurFormGroup.controls['nom'].hasError('maxlength') ? ErrorTypeUtilisateur.UTILISATEUR_NOM_LENGTH :
          this.utilisateurFormGroup.controls['nom'].hasError('pattern') ? ErrorTypeUtilisateur.UTILISATEUR_NOM_FORMAT :
          '';
  }

  getErrorMessagePrenom()
  {
    return this.utilisateurFormGroup.controls['prenom'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_PRENOM_EMPTY :
      this.utilisateurFormGroup.controls['prenom'].hasError('minlength') ? ErrorTypeUtilisateur.UTILISATEUR_PRENOM_LENGTH :
        this.utilisateurFormGroup.controls['prenom'].hasError('maxlength') ? ErrorTypeUtilisateur.UTILISATEUR_PRENOM_LENGTH :
          this.utilisateurFormGroup.controls['prenom'].hasError('pattern') ? ErrorTypeUtilisateur.UTILISATEUR_PRENOM_FORMAT :
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

  getErrorMessageRole()
  {
    return this.utilisateurFormGroup.controls['role'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_ROLE_EMPTY :
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
      this.utilisateurFormGroup.controls['NRN'].hasError('pattern') ? ErrorTypeUtilisateur.UTILISATEUR_NRN_FORMAT :
        this.utilisateurFormGroup.controls['NRN'].hasError('minlength') ? ErrorTypeUtilisateur.UTILISATEUR_NRN_LENGTH :
          this.utilisateurFormGroup.controls['NRN'].hasError('maxlength') ? ErrorTypeUtilisateur.UTILISATEUR_NRN_LENGTH :
            '';
  }
}
