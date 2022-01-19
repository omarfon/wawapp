import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentService {
  private SERVER = apiUrl;
  private apiUrl = `${this.SERVER}ebooking/`
  private apiAppointmentsAll = `${this.SERVER}appointments/patientContacts`;
  constructor(public http: HttpClient) { }


  getAppointmentsPeruser() {
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    return this.http.get(this.apiUrl + 'appointments/patient', {headers}).pipe(
                    map((resp:any) =>{
                        return resp;
                    })
      
    )
  }

  createAppointment(subida, id){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    let params = JSON.parse(subida);
    /* params.provisions = [{"tipoPrestacion":"CONSULTA", "instructions":"", "name":"CONSULTA AMBULATORIA POR MEDICO ESPECIALISTA", "default":false, "id":44}] */

    // console.log('appointment:',subida, params);
    return this.http.post(this.apiUrl + `appointments/createforuser/${id}`, params, {headers}).pipe(
                    map(data =>{
                        return data;
                    })
    )
  }

getAllAppointmentsUser(){
  const authorization = JSON.parse(localStorage.getItem('authorization'));
  let headers = new HttpHeaders({"Authorization": authorization.authorization});
  return this.http.get(this.apiAppointmentsAll, {headers}).pipe(
                  map(data =>{
                    return data;
                  })
  )
}

getAppoinmentsPerUserControl(id){
  const authorization = JSON.parse(localStorage.getItem('authorization'));
  let headers = new HttpHeaders({"Authorization": authorization.authorization});
  return this.http.get(this.apiUrl + `appointments/patient-contacts/${id}`, {headers}).pipe(
                  map(data =>{
                    return data;
                  })
  )
}

destroyAppointment(appointment, id) {
  const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
  // appointment.email = localStorage.getItem('emailUser'); appointment.password = localStorage.getItem('passUser');

  return this.http.post(this.apiUrl + `appointments/deleteForUser/${appointment.appointmentId}/${id}`,{}, {headers}).pipe(
                  map( data => {
                    return data;
                  })
  )
}

destroyAppointmentContact(appointment) {
  const authorization = JSON.parse(localStorage.getItem('authorization'));
  let headers = new HttpHeaders({"Authorization": authorization.authorization});
  // appointment.email = localStorage.getItem('emailUser'); appointment.password = localStorage.getItem('passUser');

  return this.http.delete(this.apiUrl + `appointments/patient-contacts/${appointment.patient.id}/${appointment.appointmentId}/`, {headers}).pipe(
                  map( data => {
                    return data;
                  })
  )
}
chekstatusAppointment(appointmentId) {

  const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

  return this.http.get(this.apiUrl + `ebboking/appointments/${appointmentId}/status`, { headers }).pipe(
    map(resp => {
      return resp
    })
  )
}


chekstatusAppointmentParent(patientId, appointmentId) {
  const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
  return this.http.get(this.apiUrl + `ebboking/appointments-contact/${patientId}/${appointmentId}/status`, { headers }).pipe(
    map(resp => {
      return resp
    })
  )
}


confirmDate(appointmentId) {
  console.log(appointmentId);
  const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
  let params = "";

  return this.http.post(this.apiUrl + `ebboking/appointments/${appointmentId}/confirm`, params, { headers }).pipe(
    map(resp => {
      return resp
    })
  )
  }
  
confirmDateParent(patientId, appointmentId) {
  const authorization = JSON.parse(localStorage.getItem('authorization'));
  let headers = new HttpHeaders({"Authorization": authorization.authorization});
  let params = "";

  return this.http.post(this.apiUrl + `ebboking/appointments-contact/${patientId}/${appointmentId}/confirm`, params, { headers }).pipe(
    map(resp => {
      return resp
    })
  )
}

}
