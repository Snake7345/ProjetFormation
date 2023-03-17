import {Component, OnInit} from '@angular/core';
import {Payslabo} from "../models/payslabo";
import {PayslaboService} from "../services/payslabo/payslabo.service";
import {IPays} from "../shared/interfaces/IPays";

@Component({
  selector: 'app-depenses-par-pays',
  templateUrl: './depenses-par-pays.component.html',
  styleUrls: ['./depenses-par-pays.component.scss']
})
export class DepensesParPaysComponent implements OnInit{

  view: [number,number] = [900, 600];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  paysData : IPays[] = []

  paysLabos : Payslabo[] = []

  listeVide = undefined
  isloading: boolean = true;


  ngOnInit(): void {
    this.afficherPays()
  }



  constructor(private paysLaboService: PayslaboService)
  {

  }




afficherPays()
{
  this.isloading = true;
  this.paysLaboService.liste().subscribe(
    {
      next: (data) => {
        this.isloading = false;
        this.paysLabos = data;
        //console.log(data)
        //console.log(this.paysLabos);
        //Affichage des valeurs
        this.paysLabos.forEach(element => console.log(element));
        //Parcours du tableau de base et transfert des données utiles dans un tableau
        this.paysLabos.forEach((element, index) => {
          this.paysData.push({
            name: element.denomination,
            value: element.FK_idValeursLabo.valeur
          });
          this.listeVide = undefined;
          console.log(this.paysData)
        })
      },
      error: (err) => {
        this.listeVide = err.error.message
      }
    })
}

}
