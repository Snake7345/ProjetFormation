import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SyllabusService} from "../../services/syllabus/syllabus.service";
import {Formations} from "../../models/formations";
import {Syllabus} from "../../models/syllabus";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-table-syllabus',
  templateUrl: './table-syllabus.component.html',
  styleUrls: ['./table-syllabus.component.scss']
})
export class TableSyllabusComponent implements OnInit{

  constructor(
    private _formBuilder : FormBuilder,
    private _router : Router,
    private activatedRoute: ActivatedRoute,
    private syllabusservice : SyllabusService,
    private toastr : ToastrService,
  ) { }

  syllabus: Syllabus[] = []; // Initialisez le tableau avec une valeur vide

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.syllabusservice.getAllSyllabusByFormation(id).subscribe(
      data => {
        if (data && data.length > 0) {
          data.forEach(item => {
            const syllabusItem: Syllabus = {
              idSyllabus: item.idSyllabus,
              nom: item.nom,
              chemin: item.chemin,
              actif: item.actif,
              formation: item.formation
            };
            this.syllabus.push(syllabusItem);
          });
        }
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this._router.navigate(['/']);
      }
    );
  }

}
