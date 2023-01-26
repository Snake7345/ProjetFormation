import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Anneeslabo} from "../../models/anneeslabo";

@Injectable({
  providedIn: 'root'
})
export class AnneeslaboService {

  constructor(private httpClient: HttpClient) {
  }

  anneesURL = environment.anneesUrl;

  public liste(): Observable<Anneeslabo[]> {
    return this.httpClient.get<Anneeslabo[]>(`${this.anneesURL}`);
  }

  public detail(id: number): Observable<Anneeslabo> {
    return this.httpClient.get<Anneeslabo>(`${this.anneesURL}${id}`);
  }

  public save(projets: Anneeslabo): Observable<any> {
    return this.httpClient.post<any>(`${this.anneesURL}`, projets);
  }

  public update(id: number, projets: Anneeslabo | null): Observable<any> {
    return this.httpClient.put<any>(`${this.anneesURL}${id}`, projets);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.anneesURL}${id}`);
  }
}
