import {Component, OnInit} from '@angular/core';
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {Utilisateurs} from "../../models/utilisateurs";
import Swal from 'sweetalert2';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {UtilisateursActivDesactiv} from "../../models/otherModels/utilisateursActivDesactiv";
import {RolesService} from "../../services/roles/roles.service";
import {Roles} from "../../models/role";

@Component({
  selector: 'app-table-utilisateurs',
  templateUrl: './table-utilisateurs.component.html',
  styleUrls: ['./table-utilisateurs.component.scss']
})
export class TableUtilisateursComponent implements OnInit {

  utilisateurs: Utilisateurs[] = [];

  listeVide = undefined;

  role : Roles[] = [];


  constructor(private utilisateurService: UtilisateursService,
              private toastr : ToastrService,
              private _router : Router,
  )
  {}

  ngOnInit(): void {
    this.afficherUtilisateurs();
  }

  afficherUtilisateurs(): void {
    this.utilisateurService.liste().subscribe(
      (data) => {
        this.utilisateurs = data;
        this.listeVide = undefined;
      },
      (err) => {
        this.listeVide = err.error.message;
      }
    );
  }


  onUpdate(id: number | undefined, actif : number): void
  {
    Swal.fire({
      title: 'Confirmation ?',
      text: 'êtes vous sur de vouloir désactiver/réactiver l\'utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        if(actif == 1)
        {
          actif = 0;
        }
        else
        {
          actif = 1;
        }
        const utilisateur = new UtilisateursActivDesactiv(id,actif)
        this.utilisateurService.activdesactiv(id, utilisateur).subscribe(
          data => {
            this.toastr.success(data.message, 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this._router.navigate(['tableUtilisateurs']);
            this.afficherUtilisateurs();
            Swal.fire(
            'OK',
            'Utilisateur activé/désactivé',
            'success'
            );
          },

          err => {
            this.toastr.error(err.error.message, 'Fail', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
          }
        );


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'L\'action a été annulé',
          'error'
        );
      }
    });
  }
}
