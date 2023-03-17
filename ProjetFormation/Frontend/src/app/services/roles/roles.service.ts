import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Roles} from "../../models/role";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private httpClient: HttpClient) {
  }

  rolesUrl = environment.rolesUrl;

  public liste(): Observable<Roles[]> {
    return this.httpClient.get<Roles[]>(`${this.rolesUrl}`);
  }

  public detail(id: number): Observable<Roles> {
    return this.httpClient.get<Roles>(`${this.rolesUrl}/readrole/${id}`);
  }
}
