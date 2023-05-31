import {Component, OnInit} from '@angular/core';
import {UtilisateursService} from "../../../services/utilisateurs/utilisateurs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilisateurCo} from "../../../models/otherModels/utilisateurCo";

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
    private utilisateursService: UtilisateursService
  )
  {}

  DisconnectClearData()
  {
    this._router.navigate(['/']);
  }

  ngOnInit(): void {
    this.utilisateursService.utilisateurSubject$.subscribe({
      next: (data: UtilisateurCo) => this.utilisateur = data as UtilisateurCo
    })
    console.log("je récupère", this.utilisateur)

  }
}
