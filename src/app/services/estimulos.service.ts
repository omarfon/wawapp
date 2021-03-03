import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstimulosService {

  private apiUrlOne = apiUrl + `wawa/estimulacion-notas`
  constructor(public http: HttpClient) { }

  getDataEstimulation(){
    return this.http.get(this.apiUrlOne).pipe(
        map(resp =>{
              return resp
        })
    )
  }
}
