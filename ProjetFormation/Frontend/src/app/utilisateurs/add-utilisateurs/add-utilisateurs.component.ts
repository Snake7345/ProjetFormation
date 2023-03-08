import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CategoriesService} from "../../services/categories/categories.service";
import {ToastrService} from "ngx-toastr";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {Categories} from "../../models/categories";
import {Utilisateurs} from "../../models/utilisateurs";
import {ISexe} from "./ISexe";
import {RolesService} from "../../services/roles/roles.service";
import {Anneeslabo} from "../../models/anneeslabo";
import {Roles} from "../../models/role";

@Component({
  selector: 'app-add-utilisateurs',
  templateUrl: './add-utilisateurs.component.html',
  styleUrls: ['./add-utilisateurs.component.scss'],
})
export class AddUtilisateursComponent implements OnInit{

  actif : number = 1;

  selectedValueSexe? : string;
  selectedValueRole? : string;
  sexe: ISexe[] = [
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
      email:new FormControl('', [Validators.required,
        Validators.minLength(4), Validators.maxLength(100)]),
      NRN:new FormControl('', [Validators.required,
        Validators.minLength(11), Validators.maxLength(11)]),
      password:new FormControl('', [Validators.required,
        Validators.minLength(11), Validators.maxLength(11)])
    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.utilisateurFormGroup.controls[controlName].hasError(errorName);
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
}
