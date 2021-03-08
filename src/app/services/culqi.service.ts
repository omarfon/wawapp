import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CulqiService {
  private SERVER = apiUrl;
  private apiUrlCulqi = `${this.SERVER}ebooking/culqi-charges`;

  constructor(public http: HttpClient) { }

  charges(data ){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    let params = data;
    return this.http.post(this.apiUrlCulqi , params, {headers}).pipe(
                    map(data =>{
                      return data;
                    })
               )
        }

}
