import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ISexe} from "../../shared/interfaces/ISexe";
import {Roles} from "../../models/role";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {RolesService} from "../../services/roles/roles.service";
import {ToastrService} from "ngx-toastr";
import {Utilisateurs} from "../../models/utilisateurs";
import {ErrorTypeUtilisateur} from "../../shared/utilities/error.enum";

@Component({
  selector: 'app-update-utilisateurs',
  templateUrl: './update-utilisateurs.component.html',
  styleUrls: ['./update-utilisateurs.component.scss']
})
export class UpdateUtilisateursComponent {
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
    this.afficherRole()
    this.utilisateurFormGroup = new FormGroup({
      nom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100), Validators.pattern("^[a-zA-Z]+(?:-[a-zA-Z]+)*$")]),
      prenom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100), Validators.pattern("^[a-zA-Z]+(?:-[a-zA-Z]+)*$")]),
      mail:new FormControl('', [Validators.required,
        Validators.minLength(4), Validators.maxLength(100),
        Validators.pattern(
          "[a-z0-9!#$%&’*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
        )]),
      NRN:new FormControl('', [Validators.required,
        Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$"),]),
      password:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100)]),
      sexe:new FormControl('', [Validators.required,]),
      role:new FormControl('', [Validators.required,])
    })
    const id = this.activatedRoute.snapshot.params['id'];
    this.utilisateurService.detail(id).subscribe(
      data => {
        this.selectedRole = data.role.idRoles
        this.utilisateur = {
          idUtilisateurs:data.idUtilisateurs,
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
        this._router.navigate(['/']);
      }
    );
  }

  afficherRole(): void {
    this.roleservice.liste().subscribe(
      (data) => {
        this.roles = data;
        console.log("affichage role : ", this.roles)
        this.listeVide = undefined;
        console.log(this.roles)
      },
      (err) => {
        this.listeVide = err.error.message;
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
    this.utilisateur.role=this.utilisateurFormGroup.get("role")?.value
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
