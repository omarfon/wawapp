import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  private SERVER = apiUrl;
  constructor(public http: HttpClient) { }

  getAllControlPerContact(id){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    return this.http.get(this.SERVER + 'ebooking/encuentros-paciente-contacto/' + `${id}`, {headers}).pipe(
                    map((data:any)=>{
                        return data
                    })
    )
                      
  }
}
