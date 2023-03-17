import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Formations} from "../../models/formations";

@Injectable({
  providedIn: 'root'
})
export class FormationsService {

  constructor(private httpClient: HttpClient) { }

  formationsUrl = environment.formationsUrl;

  public liste(): Observable<Formations[]> {
    return this.httpClient.get<Formations[]>(`${this.formationsUrl}`);
  }
}
