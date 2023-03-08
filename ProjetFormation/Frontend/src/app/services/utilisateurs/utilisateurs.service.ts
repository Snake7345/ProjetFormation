import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Utilisateurs} from "../../models/utilisateurs";

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  constructor(private httpClient: HttpClient) { }

  utilisateursUrl = environment.utilisateursUrl;

  public liste(): Observable<Utilisateurs[]> {
    return this.httpClient.get<Utilisateurs[]>(`${this.utilisateursUrl}`);
  }

  public save(utilisateurs: Utilisateurs): Observable<any> {
    return this.httpClient.post<any>(`${this.utilisateursUrl}/createutilisateur`, utilisateurs);
  }
}
