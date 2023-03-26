import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit
{
  public connexionFormGroup! : FormGroup;
  constructor(
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

  }

}
