import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { entrepreneur } from 'src/app/models/entrepreneur/entrepreneur.model';
import { produit } from 'src/app/models/produit/produit.model';
import { AuthService } from 'src/app/services/api/auth.service';
import { EntrepreneurService } from 'src/app/services/api/entrepreneur.service';
import { ProduitService } from 'src/app/services/api/produit.service';
import { tokenService } from 'src/app/services/other/token-service.service';

@Component({
  selector: 'app-all-produit-entrepreneur',
  templateUrl: './all-produit-entrepreneur.component.html',
  styleUrls: ['./all-produit-entrepreneur.component.scss']
})
export class AllProduitEntrepreneurComponent implements OnInit {

  public produits : produit[] = []
  public entrepreneur : entrepreneur  

  constructor(
    private _route: Router,
    private _authService: AuthService,
    private _produitService : ProduitService,
    private _entrepreneurservice : EntrepreneurService,
    private _tokenService : tokenService
  ) { }

  ngOnInit(): void {
    if (!this._authService.isConnected()) {
      this._route.navigate(["auth", "login"])
    }
    this.getAllById()
  }
  
  getAllById(): void {
    let id: number = parseInt(this._tokenService.getIdFromToken())
    this._entrepreneurservice.getByUtilisateurId(id).subscribe({
      next: (entrepreneur) => {
        this.entrepreneur = entrepreneur
        this.getAllProduits()
      },
      error: (error) => {
        console.log(error)
      },
      complete : () => {}
    })
  }

  getAllProduits(): void{
    this._produitService.GetByEntrepreneurId(this.entrepreneur.id).subscribe({
      next: (produits) => {
        this.produits = produits
      },
      error: (error) => {
        console.log(error)
      },
      complete : () => {}
    })
  }

  chargerRouteProduit(id): void {
    this._route.navigate(["entrepreneur", "detail", id])
  }

  chargeRouteAddProduit(): void {
    this._route.navigate(["entrepreneur", "add", this.entrepreneur.id])
  }

  chargeRouteAddProfil(): void {
    this._route.navigate(["entrepreneur", "profil"])
  }
}
