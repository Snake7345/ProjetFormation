import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Formations} from "../../models/formations";
import {UtilisateursActivDesactiv} from "../../models/otherModels/utilisateursActivDesactiv";
import {Utilisateurs} from "../../models/utilisateurs";
import {FormationsActivDesactiv} from "../../models/otherModels/formationsActivDesactiv";

@Injectable({
  providedIn: 'root'
})
export class FormationsService {

  constructor(private httpClient: HttpClient) { }

  formationsUrl = environment.formationsUrl;

  public liste(): Observable<Formations[]> {
    return this.httpClient.get<Formations[]>(`${this.formationsUrl}`);
  }

  public activdesactiv(id: number | undefined, formation : FormationsActivDesactiv): Observable<any>
  {
    return this.httpClient.patch<any>(`${this.formationsUrl}/activdesactiv/${id}`, formation);
  }

  public save(formation: Formations): Observable<any> {
    return this.httpClient.post<any>(`${this.formationsUrl}/createformation`, formation);
  }

  public detail(id: number): Observable<Formations> {
    return this.httpClient.get<Formations>(`${this.formationsUrl}/readformation/${id}`);
  }

  public update(id: number, formations: Formations | null): Observable<any> {
    return this.httpClient.patch<any>(`${this.formationsUrl}/modifier/${id}`, formations);
  }

}
