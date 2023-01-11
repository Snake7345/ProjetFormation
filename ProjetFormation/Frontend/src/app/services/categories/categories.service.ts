import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categories} from "../../models/categories";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _client: HttpClient) { }

  // récupère tous les entrepreneurs
  getAll(): Observable<Categories[]>{
    let categories = this._client.get<Categories[]>(`${environment.apiUrl}/categorie/getAll`)
    return categories
  }

  // récupère un entrepreneur par son id
  getById(id : number) : Observable<Categories>{
    let categorie = this._client.get<Categories>(`${environment.apiUrl}/categorie/getById/${id}`)
    return categorie;
  }

  // récupère un entrepreneur par son nom
  getByName(name : string) : Observable<Categories[]>{
    let categorie = this._client.get<Categories[]>(`${environment.apiUrl}/categorie/getByName/${name}`)
    return categorie;
  }

  // met a jour un entrepreneur par son id
  update(id: number, categories: Categories){
    return this._client.patch(`${environment.apiUrl}/categorie/updateById/${id}`,{ categorie : categories})
  }

  // supprime un entrepreneur par son id
  delete(id:number){
    return this._client.delete(`${environment.apiUrl}/categorie/delete/${id}`)
  }
}
