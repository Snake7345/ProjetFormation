import {Component, OnInit} from '@angular/core';
import {UtilisateursService} from "../../services/utilisateurs/utilisateurs.service";
import {Utilisateurs} from "../../models/utilisateurs";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-table-utilisateurs',
  templateUrl: './table-utilisateurs.component.html',
  styleUrls: ['./table-utilisateurs.component.scss']
})
export class TableUtilisateursComponent implements OnInit {

  utilisateurs: Utilisateurs[] = [];

  listeVide = undefined;

  constructor(private utilisateurService: UtilisateursService) {
  }

  ngOnInit(): void {
    this.afficherUtilisateurs();
  }

  afficherUtilisateurs(): void {
    this.utilisateurService.liste().subscribe(
      (data) => {
        this.utilisateurs = data;
        console.log("affichage:" , data)
        this.listeVide = undefined;
      },
      (err) => {
        this.listeVide = err.error.message;
      }
    );
  }

  onUpdate(): void
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
        //this.utilisateurService.delete(id).subscribe(res => this.cargarProductos());
        Swal.fire(
          'OK',
          'Utilisateur activé/désactivé',
          'success'
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
