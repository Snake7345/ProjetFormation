import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {Utilisateurs} from "../../models/utilisateurs";
import {ISexe} from "../../shared/interfaces/ISexe";
import {RolesService} from "../../services/roles/roles.service";
import {Roles} from "../../models/role";

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
        Validators.minLength(2), Validators.maxLength(100)]),
      prenom:new FormControl('', [Validators.required,
        Validators.minLength(2), Validators.maxLength(100)]),
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
    if(this.utilisateurFormGroup.invalid) return
    const utilisateur = new Utilisateurs(this.utilisateurFormGroup.value.nom,
      this.utilisateurFormGroup.value.prenom,this.utilisateurFormGroup.value.password,
      this.utilisateurFormGroup.value.mail,this.utilisateurFormGroup.value.NRN,
      this.utilisateurFormGroup.value.sexe,this.actif, this.utilisateurFormGroup.value.role);
    console.log(utilisateur)
    this.utilisateurService.save(utilisateur).subscribe(
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

  retour() {
    this._router.navigate(["tableUtilisateurs"])
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

  getErrorMessageRole()
  {
    return this.utilisateurFormGroup.controls['role'].hasError('required') ? 'Le role est requis.' :
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
