import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  public dataNota;
  private SERVER = apiUrl;
  constructor(public http: HttpClient) { }

  getAllNotes(){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    return this.http.get(this.SERVER + 'wawa/data', {headers}).pipe(
      map(res => {
        return res
      })
    )
  }

  getNotesPerMonth(mes){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    return this.http.get(this.SERVER + `wawa/data?mes=${mes}`, {headers}).pipe(
      map(res => {
        return res
      })
    )
  }
}
