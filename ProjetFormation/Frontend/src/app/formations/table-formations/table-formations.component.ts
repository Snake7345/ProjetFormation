import {Component, OnInit} from '@angular/core';
import {Formations} from "../../models/formations";
import {FormationsService} from "../../services/formations/formations.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {CategoriesActivDesactiv} from "../../models/otherModels/categoriesActivDesactiv";
import {FormationsActivDesactiv} from "../../models/otherModels/formationsActivDesactiv";

@Component({
  selector: 'app-table-formations',
  templateUrl: './table-formations.component.html',
  styleUrls: ['./table-formations.component.scss']
})
export class TableFormationsComponent implements OnInit{

  formations: Formations[] = [];

  listeVide = undefined;
  constructor(private formationService: FormationsService,
              private toastr : ToastrService,
              private _router : Router,) {}

  ngOnInit(): void {
    this.afficherFormations();
  }

  afficherFormations(): void {
    this.formationService.liste().subscribe(
      (data) => {
        this.formations = data;
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
      text: 'êtes vous sur de vouloir désactiver/réactiver la formation ?',
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
        const formation = new FormationsActivDesactiv(id,actif)
        this.formationService.activdesactiv(id, formation).subscribe(
          data => {
            this.toastr.success(data.message, 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this._router.navigate(['tableFormations']);
            this.afficherFormations();
            Swal.fire(
              'OK',
              'Formation activé/désactivé',
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
