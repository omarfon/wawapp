import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParematersService {
  private SERVER =  apiUrl;
  private apiParameters = this.SERVER + 'ebooking/parametros-encuentro-contacto/';
  constructor(public http: HttpClient) { }

  getParametersPerId(patientId, id){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});

    return this.http.get(this.apiParameters + `${patientId}?encuentroid=${id}`, {headers}).pipe(
              map((data: any) => {
                return data
              })
    )   
  }

  getAllParametersPerId(patientId){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});

    return this.http.get(this.apiParameters + `${patientId}`, {headers}).pipe(
                    map((data: any) => {
                      return data
                    })
    )
  }
  
}
