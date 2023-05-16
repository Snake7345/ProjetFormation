import {Component, OnInit} from '@angular/core';
import {UtilisateursService} from "../../../services/utilisateurs/utilisateurs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Utilisateurs} from "../../../models/utilisateurs";
import {UtilisateurCo} from "../../interfaces/UtilisateurCo";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit
{

  utilisateur?: UtilisateurCo;

  constructor(
    private _router : Router,
    private _utilisateursService: UtilisateursService
  )
  {}

  DisconnectClearData()
  {
    sessionStorage.clear();
    this._router.navigate(['/']);
  }

  ngOnInit(): void {
    this._utilisateursService.utilisateurSubject$.subscribe({
      next: (data: UtilisateurCo) => this.utilisateur = data
    })
  }

}
