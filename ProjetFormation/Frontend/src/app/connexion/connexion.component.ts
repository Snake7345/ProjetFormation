import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Invite} from "../models/otherModels/Invite";
import {UtilisateursService} from "../services/utilisateurs/utilisateurs.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit
{
  public connexionFormGroup! : FormGroup;

  constructor(
    private utilisateurService: UtilisateursService,
    private activatedRoute: ActivatedRoute,
    private toastr : ToastrService,
    private _router : Router)
  {}
  ngOnInit(): void {
    this.connexionFormGroup = new FormGroup({
      mail:new FormControl('', [Validators.required,
        Validators.pattern(
          "[a-z0-9!#$%&’*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
        )]),
      password:new FormControl('', [Validators.required,]),
    })
  }

  getErrorMessageMail()
  {
    return this.connexionFormGroup.controls['mail'].hasError('required') ? 'Le mail est requis.' :
          this.connexionFormGroup.controls['mail'].hasError('pattern') ? 'Le format du mail ne correspond pas.' :
            '';
  }

  getErrorMessagePassword()
  {
    return this.connexionFormGroup.controls['password'].hasError('required') ? 'Le password est requis' :
          '';
  }

  connexion()
  {
      if(this.connexionFormGroup.invalid) return
      const invite = new Invite(this.connexionFormGroup.value.mail,
        this.connexionFormGroup.value.password);
      this.utilisateurService.connexion(invite).subscribe(
        data => {
          /*sessionStorage.setItem("id", data.idUtilisateur)
          sessionStorage.setItem("role", data.role.denomination)*/
          this._router.navigate(['homepage']);
        },
        err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );
  }
}
