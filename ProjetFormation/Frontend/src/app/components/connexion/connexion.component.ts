import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Invite} from "../../models/otherModels/Invite";
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {ErrorTypeUtilisateur} from "../../shared/utilities/error.enum";


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit
{
  public connexionFormGroup! : FormGroup;

  /*
  * ? = Cela permet de dire que ca sera initialisé au plus tard dans le constructeur ou le oninit et que la valeur soit la valeur du type ou undefined
  * ! = Cela permet de dire que ca sera initialisé au plus tard dans le constructeur ou le oninit et que la valeur soit la valeur du type
  * */
  constructor(
    private utilisateurService: UtilisateursService,
    private activatedRoute: ActivatedRoute,
    private toastr : ToastrService,
    private _router : Router,
    )
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
    return this.connexionFormGroup.controls['mail'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_MAIL_EMPTY :
          this.connexionFormGroup.controls['mail'].hasError('pattern') ? ErrorTypeUtilisateur.UTILISATEUR_MAIL_FORMAT :
            '';
  }

  getErrorMessagePassword()
  {
    return this.connexionFormGroup.controls['password'].hasError('required') ? ErrorTypeUtilisateur.UTILISATEUR_PASSWORD_EMPTY :
          '';
  }



  connexion() {
    if (this.connexionFormGroup.invalid) return;

    const invite = new Invite(
      this.connexionFormGroup.value.mail,
      this.connexionFormGroup.value.password
    );

    this.utilisateurService.connexion(invite).subscribe(
      data => {
        console.log("je suis de la data  :", data);

        const token = data.token;
        const decodedToken = this.utilisateurService.decodeToken(token);
        /*console.log("je suis le token décodé :", decodedToken);
        const id = decodedToken && 'id' in decodedToken ? decodedToken['id'] : undefined;
        const email = decodedToken && 'email' in decodedToken ? decodedToken['email'] : undefined;
        const permissions = decodedToken && 'permissions' in decodedToken ? decodedToken['permissions'] : undefined;

        if (typeof id === 'number') {
          sessionStorage.setItem('id', id.toString());
        }

        if (typeof email === 'string') {
          sessionStorage.setItem('email', email);
        }

        if (Array.isArray(permissions)) {
          sessionStorage.setItem('permissions', JSON.stringify(permissions));
        }*/

        this._router.navigate(['homepage']);
      },
      err => {
        this.toastr.error(err.error.message, 'Echec de la connexion', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
}