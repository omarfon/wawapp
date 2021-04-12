import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SERVER = apiUrl;
  private apiUrl = `${this.SERVER}auth/login`;
  private apiUrlDatos = `${this.SERVER}ebooking`
  private apiCreate = `${this.SERVER}users/register/`;
  
  public userId;
  public patientId;
  public content;
  public recovery;
  constructor(public http: HttpClient) { }


  doSignIn(email, password){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({'Authorization': authorization});

    let params = {email:email, password: password , app:'wawa'}
    // let params = {email:email, password: shajs('sha256').update(password).digest('hex') }
    return this.http.post(`${this.SERVER}auth/login`, params, {headers}).pipe(
                          map(data =>{
                            return data
                          })
                      )
    }

    doSignUp(params){
      return this.http.post(this.apiUrl + 'register', params).pipe(
                        map(data =>{
                          return data
                        })
                      )
    }

    sendValidation(email){
      let params = {email: email};
      const authorization = localStorage.getItem('authorization');
      let headers = new HttpHeaders({"Authorization": authorization});
      console.log('params:', params);
      return this.http.post(this.SERVER + 'users/validate-email/recovery', params, {headers}).pipe(
                      map(data =>{
                        return data
                      })
                )
     }

     recoveryLogin(datos){
      let params = {code: datos.code, email: datos.email, id: datos.id, password: datos.password, app: 'wawa'};
      const authorization = localStorage.getItem('authorization');
      let headers = new HttpHeaders({"Authorization": authorization});
      return this.http.post(this.SERVER + 'users/login-recovery', params, {headers}).pipe(
                      map(data => {
                        return data
                      })
                  )
      }

      changePassword(password, passwordNew){
        let params = {password: password, passwordNew: passwordNew };
        console.log('los paramasque cambian la contraseña:', params);
        const authorization = localStorage.getItem('authorization');
        let headers = new HttpHeaders({"Authorization": authorization});
        return this.http.put(this.apiUrl + 'update-password', params, {headers}).pipe(
                        map(data => {
                          return data
                        })
                    )
      }

      getDatosPaciente(id){
        const authorization = localStorage.getItem('authorization');
        let headers = new HttpHeaders({"Authorization": authorization});
        return this.http.get(this.apiUrlDatos + `datos-paciente?patientid=${id}`,  {headers}).pipe(
                        map(data => {
                          return data
                        })
                      )
      }

      getKey(){
         return this.http.get(this.SERVER + 'users/public-authorization').pipe(
                          map(data => {
                            return data
                          })
                       )
      }
      
      createNewUser(datos) {
        // console.log('los datos de register:', datos)
        const authorization = localStorage.getItem('authorization');
        let headers = new HttpHeaders({ "Authorization": authorization });
        let params = datos;
        // console.log('los datos de register:', datos)
        // params.provisions = [{"tipoPrestacion":"CONSULTA", "instructions":"", "name":"CONSULTA AMBULATORIA POR MEDICO ESPECIALISTA", "default":false, "id":44}]
        return this.http.post(this.apiCreate, params, { headers }).pipe(
          map((resp: any) => {
            return resp;
          })
        )
      }

}
