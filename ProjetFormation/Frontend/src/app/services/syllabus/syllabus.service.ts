import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Utilisateurs} from "../../models/utilisateurs";
import {Syllabus} from "../../models/syllabus";
import {UtilisateursActivDesactiv} from "../../models/otherModels/utilisateursActivDesactiv";
import {SyllabusActivDesactiv} from "../../models/otherModels/syllabusActivDesactiv";

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  constructor(private httpClient: HttpClient) { }

  syllabusUrl = environment.syllabusUrl;

  public getAllSyllabusByFormation(id:number): Observable<Syllabus[]> {
    return this.httpClient.get<Syllabus[]>(`${this.syllabusUrl}/readsyllabusbyformations/${id}`);
  }

  public activdesactiv(id: number | undefined, syllabus : SyllabusActivDesactiv): Observable<any>
  {
    return this.httpClient.patch<any>(`${this.syllabusUrl}/activdesactiv/${id}`, syllabus);
  }
}
