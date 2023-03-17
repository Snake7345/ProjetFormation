import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Utilisateurs} from "../../models/utilisateurs";
import {UtilisateursActivDesactiv} from "../../models/utilisateursActivDesactiv";

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  constructor(private httpClient: HttpClient) { }

  utilisateursUrl = environment.utilisateursUrl;

  public liste(): Observable<Utilisateurs[]> {
    return this.httpClient.get<Utilisateurs[]>(`${this.utilisateursUrl}`);
  }

  public detail(id: number): Observable<Utilisateurs> {
    return this.httpClient.get<Utilisateurs>(`${this.utilisateursUrl}/readutilisateur/${id}`);
  }

  public update(id: number, utilisateurs: Utilisateurs | null): Observable<any> {
    return this.httpClient.patch<any>(`${this.utilisateursUrl}/modifier/${id}`, utilisateurs);
  }

  public activdesactiv(id: number | undefined, utilisateur : UtilisateursActivDesactiv): Observable<any>
  {
    console.log("j'affiche utilisateur : ", utilisateur)
    console.log("j'affiche id : ", id)
    return this.httpClient.patch<any>(`${this.utilisateursUrl}/activdesactiv/${id}`, utilisateur);
  }

  public save(utilisateurs: Utilisateurs): Observable<any> {
    return this.httpClient.post<any>(`${this.utilisateursUrl}/createutilisateur`, utilisateurs);
  }
}
