import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Categories} from "../../models/categories";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {UtilisateursActivDesactiv} from "../../models/otherModels/utilisateursActivDesactiv";
import {CategoriesActivDesactiv} from "../../models/otherModels/categoriesActivDesactiv";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  categoriesUrl = environment.categoriesUrl;

  public liste(): Observable<Categories[]> {
    return this.httpClient.get<Categories[]>(`${this.categoriesUrl}`);
  }

  public detail(id: number): Observable<Categories> {
    return this.httpClient.get<Categories>(`${this.categoriesUrl}/readcategorie/${id}`);
  }

  public save(categories: Categories): Observable<any> {
    return this.httpClient.post<any>(`${this.categoriesUrl}/createcategorie`, categories);
  }

  public update(id: number, categories: Categories | null): Observable<any> {
    return this.httpClient.patch<any>(`${this.categoriesUrl}/modifier/${id}`, categories);
  }

  public activdesactiv(id: number | undefined, categorie : CategoriesActivDesactiv): Observable<any>
  {
    console.log("j'affiche categories : ", categorie)
    console.log("j'affiche id : ", id)
    return this.httpClient.patch<any>(`${this.categoriesUrl}/activdesactiv/${id}`, categorie);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.categoriesUrl}${id}`);;
  }


}
