import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Projetslabo} from "../../models/projetslabo";

@Injectable({
  providedIn: 'root'
})
export class ProjetslaboService {

  constructor(private httpClient: HttpClient) { }

  projetsURL = environment.projetsUrl;
  projetsanneeURL = environment.projetsUrl;


  public liste(): Observable<Projetslabo[]> {
    return this.httpClient.get<Projetslabo[]>(`${this.projetsURL}`);
  }

  public detail(id: number): Observable<Projetslabo> {
    return this.httpClient.get<Projetslabo>(`${this.projetsURL}${id}`);
  }

  public findbyAnnee(id: number): Observable<Projetslabo[]>
  {
    return this.httpClient.get<Projetslabo[]>(`${this.projetsanneeURL}${id}`);
  }

  public save(projets: Projetslabo): Observable<any> {
    return this.httpClient.post<any>(`${this.projetsURL}`, projets);
  }

  public update(id: number, projets: Projetslabo | null): Observable<any> {
    return this.httpClient.put<any>(`${this.projetsURL}${id}`, projets);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.projetsURL}${id}`);
  }


}
