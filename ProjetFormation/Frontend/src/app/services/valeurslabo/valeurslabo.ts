import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Valeurslabo} from "../../models/valeurslabo";

@Injectable({
  providedIn: 'root'
})
export class ValeurslaboService {

  constructor(private httpClient: HttpClient) { }

  valeursURL = environment.valeursUrl;

  public liste(): Observable<Valeurslabo[]> {
    return this.httpClient.get<Valeurslabo[]>(`${this.valeursURL}`);
  }

  public detail(id: number): Observable<Valeurslabo> {
    return this.httpClient.get<Valeurslabo>(`${this.valeursURL}${id}`);
  }

  public save(valeurs: Valeurslabo): Observable<any> {
    return this.httpClient.post<any>(`${this.valeursURL}`, valeurs);
  }

  public update(id: number, valeurs: Valeurslabo | null): Observable<any> {
    return this.httpClient.put<any>(`${this.valeursURL}${id}`, valeurs);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.valeursURL}${id}`);;
  }


}
