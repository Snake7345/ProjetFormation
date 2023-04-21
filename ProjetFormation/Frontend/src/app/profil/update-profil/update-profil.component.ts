import { Component } from '@angular/core';
import {ISexe} from "../../shared/interfaces/ISexe";
import {Roles} from "../../models/role";
import {Utilisateurs} from "../../models/utilisateurs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {RolesService} from "../../services/roles/roles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
    return this.utilisateurFormGroup.controls['nom'].hasError('required') ? ' Le nom de l\'utilisateur est requis' :
      this.utilisateurFormGroup.controls['nom'].hasError('minlength') ? 'La longueur doit être entre 2 et 100 caractères.' :
        this.utilisateurFormGroup.controls['nom'].hasError('maxlength') ? 'La longueur doit être entre 2 et 100 caractères.' :
          '';
  }

  getErrorMessagePrenom()
  {
    return this.utilisateurFormGroup.controls['prenom'].hasError('required') ? ' Le prénom de l\'utilisateur est requis.' :
      this.utilisateurFormGroup.controls['prenom'].hasError('minlength') ? 'La longueur doit être entre 2 et 100 caracteres.' :
        this.utilisateurFormGroup.controls['prenom'].hasError('maxlength') ? 'La longueur doit être entre 2 et 100 caracteres.' :
          '';
  }

  getErrorMessageMail()
  {
    return this.utilisateurFormGroup.controls['mail'].hasError('required') ? 'Le mail est requis.' :
      this.utilisateurFormGroup.controls['mail'].hasError('minlength') ? 'La longueur doit être entre 4 et 100 caracteres.' :
        this.utilisateurFormGroup.controls['mail'].hasError('maxlength') ? 'La longueur doit être entre 4 et 100 caracteres.' :
          this.utilisateurFormGroup.controls['mail'].hasError('pattern') ? 'Le format du mail ne correspond pas.' :
            '';
  }

  getErrorMessageSexe()
  {
    return this.utilisateurFormGroup.controls['sexe'].hasError('required') ? 'Le sexe est requis.' :
      '';
  }

  getErrorMessagePassword()
  {
    return this.utilisateurFormGroup.controls['password'].hasError('required') ? 'Le password est requis' :
      this.utilisateurFormGroup.controls['password'].hasError('minlength') ? 'La longueur doit être entre 2 et 100 caractères.' :
        this.utilisateurFormGroup.controls['password'].hasError('maxlength') ? 'La longueur doit être entre 2 et 100 caractères.' :
          '';
  }

  getErrorMessageNRN() {
    return this.utilisateurFormGroup.controls['NRN'].hasError('required') ? 'Le registre national est requis' :
      this.utilisateurFormGroup.controls['NRN'].hasError('pattern') ? 'Le registre national doit contenir que des chiffres.' :
        this.utilisateurFormGroup.controls['NRN'].hasError('minlength') ? 'La longueur doit être de 11 caractères.' :
          this.utilisateurFormGroup.controls['NRN'].hasError('maxlength') ? 'La longueur doit être de 11 caractères.' :
            '';
  }
}
