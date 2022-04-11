import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl, REGISTERMICRO } from 'src/environments/environment';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CrudparentService {
  private SERVER = apiUrl;
  private apiUrl = `${this.SERVER}ebooking/appointments/createForUser/`;
  private api = `${this.SERVER}users/register-dependent/`;
  private apiCreate = `${this.SERVER}users/register`;
  private apiValidate = `${this.SERVER}users/validate-email/register`;
  public urlRegisterMicro = REGISTERMICRO;
  constructor(public http: HttpClient) { }

  createParentDate(subida, id, provisionId) {
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    let params = JSON.parse(subida);
    params.provisions = [{ "default": false, "id": provisionId[0] }]

    return this.http.post(this.apiUrl + `${id}`, params, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

  createParent(data) {
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    let params = data;

    return this.http.post(this.api, params, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

  createNewUser(datos) {

    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    let params = datos;

    return this.http.post(this.apiCreate, params, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

  validateEmail(email) {
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    let params = email;

    return this.http.post(this.apiValidate, params, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }
  
}

