import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private SERVER = apiUrl;
  constructor(public http: HttpClient) { }

  getAllNotes(){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({'Authorization': authorization});

    return this.http.get(this.SERVER + 'wawa/notas', {headers}).pipe(
      map(res => {
        return res
      })
    )
  }
}
