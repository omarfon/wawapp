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
  private newLogin = this.SERVER + 'users/newLogin';
  private reniec = 'https://apiperu.dev/api/dni/';
  
  public userId;
  public patientId;
  public content;
  public recovery;
  public recoveryData;
  public dataSend
  constructor(public http: HttpClient) { }


  doSignIn(email, password){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

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
      const authorization = JSON.parse(localStorage.getItem('authorization'));
      let headers = new HttpHeaders({"Authorization": authorization.authorization});
      console.log('params:', params);
      return this.http.post(this.SERVER + 'users/validate-email/recovery', params, {headers}).pipe(
                      map(data =>{
                        return data
                      })
                )
     }

     sendValidationRegister(email, documentNumber, documentId, selectDocument){
      /*     let params = {email: email, documentType:{id:documentId,name:selectDocument},documentNumber:documentNumber}; */
          const authorization = JSON.parse(localStorage.getItem('authorization'));
          let headers = new HttpHeaders({"Authorization": authorization.authorization});
      /*     console.log('params:', params); */
          return this.http.post(this.SERVER + 'users/validateemail/register', {"email": email, 
                                                                        "documentType":{"id":documentId.toString(),"name":selectDocument},"documentNumber":documentNumber.toString()}, 
                                                                        {headers}).pipe(
                          map(data =>{
                            return data
                          })
          )
        }

     newLoginWithDni(documentType:string, documentNumber: string, password: string){
      const authorization = JSON.parse(localStorage.getItem('authorization'));
      let headers = new HttpHeaders({"Authorization": authorization.authorization});
      const app = "mama"
      let params = {documentType, documentNumber, password, app};
       return this.http.post(this.newLogin, params, {headers}).pipe(
         map(resp => {
           return resp
         }), err => {
          return err
      })
    }

    recoveryLogin(datos){
      //CORREGIR LLAMADA DE RECUPERAción
    /*   let params = {code: datos.code, email: datos.email, id: datos.id, password: datos.password, app: 'ebooking'}; */
    let params = datos;  
    const authorization = JSON.parse(localStorage.getItem('authorization'));
      let headers = new HttpHeaders({"Authorization": authorization.authorization});
      return this.http.post(this.SERVER + 'users/validate-email/recovery', params, {headers}).pipe(
                      map(data => {
                        return data
                      })
      )
    }

    loginRecovery(datos){
      //CORREGIR LLAMADA DE RECUPERAción
    /*   let params = {code: datos.code, email: datos.email, id: datos.id, password: datos.password, app: 'ebooking'}; */
    let params = datos;  
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
      return this.http.post(this.SERVER + 'users/login-recovery', params, {headers}).pipe(
                      map(data => {
                        return data
                      })
      )
    }

      changePassword(password, passwordNew){
        let params = {password: password, passwordNew: passwordNew };
        console.log('los paramasque cambian la contraseña:', params);
        const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
        return this.http.put(this.apiUrl + 'update-password', params, {headers}).pipe(
                        map(data => {
                          return data
                        })
                    )
      }

      getDatosPaciente(id){
        const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
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
        const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
        let params = datos;
        // console.log('los datos de register:', datos)
        // params.provisions = [{"tipoPrestacion":"CONSULTA", "instructions":"", "name":"CONSULTA AMBULATORIA POR MEDICO ESPECIALISTA", "default":false, "id":44}]
        return this.http.post(this.apiCreate, params, { headers }).pipe(
          map((resp: any) => {
            return resp;
          })
        )
      }

      getPublicKey(dni:string){
        const auth_token = '30dcd655149906b1469ac3913125f30862b0ab1b4bc0425f8256166d98a82d02';
        const cabecera = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get(this.reniec + dni, {headers: cabecera})
        }
    

}
