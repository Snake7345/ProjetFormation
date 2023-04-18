import { Component } from '@angular/core';
import {UtilisateursService} from "../../../services/utilisateurs/utilisateurs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent
{

  constructor(
    private _router : Router)
  {}

  DisconnectClearData()
  {
    localStorage.clear();
    this._router.navigate(['/']);
  }

}
