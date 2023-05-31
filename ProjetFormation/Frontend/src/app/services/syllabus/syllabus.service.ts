import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Utilisateurs} from "../../models/utilisateurs";
import {Syllabus} from "../../models/syllabus";

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  constructor(private httpClient: HttpClient) { }

  syllabusUrl = environment.syllabusUrl;

  public getAllSyllabusByFormation(id:number): Observable<Syllabus[]> {
    return this.httpClient.get<Syllabus[]>(`${this.syllabusUrl}/readsyllabusbyformations/${id}`);
  }
}
