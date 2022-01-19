import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(public http: HttpClient) { }

  private SERVER = apiUrl;
  private apiUrl = `${this.SERVER}ebooking/prescripciones-encuentro-contacto/`;
  getRecipes(patientId, id){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    return this.http.get(this.apiUrl + `${patientId}?encuentroid=${id}`, {headers}).pipe(
                map((data: any) => {
                  return data
                })
    )
  }

}
