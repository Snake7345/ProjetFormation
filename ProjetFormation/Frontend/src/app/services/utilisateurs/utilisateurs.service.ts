import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Utilisateurs} from "../../models/utilisateurs";
import {UtilisateursActivDesactiv} from "../../models/otherModels/utilisateursActivDesactiv";
import {Invite} from "../../models/otherModels/Invite";
import { JwtHelperService } from '@auth0/angular-jwt';
import {JwtPayload} from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  constructor(private httpClient: HttpClient) { }

  utilisateursUrl = environment.utilisateursUrl;

  public liste(): Observable<Utilisateurs[]> {
    return this.httpClient.get<Utilisateurs[]>(`${this.utilisateursUrl}`);
  }

  public listeByID(id:number): Observable<Utilisateurs[]> {
    return this.httpClient.get<Utilisateurs[]>(`${this.utilisateursUrl}/role/${id}`);
  }

  public detail(id: number): Observable<Utilisateurs> {
    return this.httpClient.get<Utilisateurs>(`${this.utilisateursUrl}/readutilisateur/${id}`);
  }

  public update(id: number, utilisateurs: Utilisateurs | null): Observable<any> {
    return this.httpClient.patch<any>(`${this.utilisateursUrl}/modifier/${id}`, utilisateurs);
  }

  public activdesactiv(id: number | undefined, utilisateur : UtilisateursActivDesactiv): Observable<any>
  {
    return this.httpClient.patch<any>(`${this.utilisateursUrl}/activdesactiv/${id}`, utilisateur);
  }

  public save(utilisateurs: Utilisateurs): Observable<any> {
    return this.httpClient.post<any>(`${this.utilisateursUrl}/createutilisateur`, utilisateurs);
  }

  public connexion(invite : Invite): Observable<any>{
    return this.httpClient.post<any>(`${this.utilisateursUrl}/connexion`, invite);
  }

  decodeToken(token: string): JwtPayload | null {
    const helper = new JwtHelperService();
    try {
      const decodedToken = helper.decodeToken(token) as JwtPayload;
      return decodedToken;
    } catch (error) {
      console.error("Erreur lors du décryptage du token :", error);
      return null;
    }
  }

}
