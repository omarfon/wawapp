import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private SERVER = apiUrl;
  private apiUrl = `${this.SERVER}users/`

  constructor(public http: HttpClient) { }

  getGenders(){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    return this.http.get(this.apiUrl + 'genders', {headers}).pipe(
                     map(data =>{
                      return data;
                    })

               )
  }

  getDocuments(){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    return this.http.get(this.apiUrl + 'documenttypes', {headers}).pipe(
                  map(data =>{
                    return data;
                  })
             )
          }
          
}
