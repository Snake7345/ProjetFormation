import {Component, OnInit} from '@angular/core';
import {Formations} from "../../models/formations";
import {FormationsService} from "../../services/formations/formations.service";

@Component({
  selector: 'app-table-formations',
  templateUrl: './table-formations.component.html',
  styleUrls: ['./table-formations.component.scss']
})
export class TableFormationsComponent implements OnInit{

  formations: Formations[] = [];

  listeVide = undefined;
  constructor(private formationService: FormationsService) {}

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

}
