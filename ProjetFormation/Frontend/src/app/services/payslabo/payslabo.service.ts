import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Anneeslabo} from "../../models/anneeslabo";
import {Payslabo} from "../../models/payslabo";

@Injectable({
  providedIn: 'root'
})
export class PayslaboService {

  constructor(private httpClient: HttpClient) {
  }

  paysURL = environment.paysUrl;

  public liste(): Observable<Payslabo[]> {
    return this.httpClient.get<Payslabo[]>(`${this.paysURL}`);
  }
}
