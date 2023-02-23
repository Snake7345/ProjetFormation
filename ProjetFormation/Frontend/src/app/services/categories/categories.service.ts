import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Categories} from "../../models/categories";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  categoriesURL = environment.categoriesUrl;

  public liste(): Observable<Categories[]> {
    return this.httpClient.get<Categories[]>(`${this.categoriesURL}`);
  }

  public detail(id: number): Observable<Categories> {
    return this.httpClient.get<Categories>(`${this.categoriesURL}${id}`);
  }

  public save(categories: Categories): Observable<any> {
    return this.httpClient.post<any>(`${this.categoriesURL}/createcategorie`, categories);
  }

  public update(id: number, produits: Categories | null): Observable<any> {
    return this.httpClient.put<any>(`${this.categoriesURL}${id}`, produits);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.categoriesURL}${id}`);;
  }


}
