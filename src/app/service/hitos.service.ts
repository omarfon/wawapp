import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HitosService {

  private SERVER = apiUrl;
  private apiUrlGet = `${this.SERVER}wawa/pacientes/1803/hitos`
  constructor(public http: HttpClient) { }
  
  getHitos(){
    return this.http.get(this.apiUrlGet).pipe(
      map((resp:any) =>{
        return resp
      })
      )
  }

  addHito(id){
    const userId = 861;
    let fecha = moment().format('YYYY-MM-DD');
    let params = {id: id, fecha: fecha};
      return this.http.post(this.apiUrlGet, params).pipe(
                      map(data => {
                          return data
                      })
                )
            }

   deleteHito(id){
      return this.http.delete(this.apiUrlGet + `/${id}`);
    }
}
