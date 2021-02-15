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
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});

    return this.http.get(this.apiUrl + 'appointments/patient', {headers}).pipe(
                    map((resp:any) =>{
                        return resp;
                    })
      
    )
  }

  createAppointment(subida, id){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    let params = JSON.parse(subida);
    params.provisions = [{"tipoPrestacion":"CONSULTA", "instructions":"", "name":"CONSULTA AMBULATORIA POR MEDICO ESPECIALISTA", "default":false, "id":44}]

    // console.log('appointment:',subida, params);
    return this.http.post(this.apiUrl + `appointments/createforuser/${id}`, params, {headers}).pipe(
                    map(data =>{
                        return data;
                    })
    )
  }

getAllAppointmentsUser(){
  const authorization = localStorage.getItem('authorization');
  let headers = new HttpHeaders({"Authorization": authorization});
  return this.http.get(this.apiAppointmentsAll, {headers}).pipe(
                  map(data =>{
                    return data;
                  })
  )
}

getAppoinmentsPerUserControl(id){
  const authorization = localStorage.getItem('authorization');
  let headers = new HttpHeaders({"Authorization": authorization});
  return this.http.get(this.apiUrl + `appointments/patient-contacts/${id}`, {headers}).pipe(
                  map(data =>{
                    return data;
                  })
  )
}

destroyAppointment(appointment, id) {
  const authorization = localStorage.getItem('authorization');
  let headers = new HttpHeaders({"Authorization": authorization});
  // appointment.email = localStorage.getItem('emailUser'); appointment.password = localStorage.getItem('passUser');

  return this.http.post(this.apiUrl + `appointments/deleteForUser/${appointment.appointmentId}/${id}`,{}, {headers}).pipe(
                  map( data => {
                    return data;
                  })
  )
}

destroyAppointmentContact(appointment) {
  const authorization = localStorage.getItem('authorization');
  let headers = new HttpHeaders({"Authorization": authorization});
  // appointment.email = localStorage.getItem('emailUser'); appointment.password = localStorage.getItem('passUser');

  return this.http.delete(this.apiUrl + `appointments/patient-contacts/${appointment.patient.id}/${appointment.appointmentId}/`, {headers}).pipe(
                  map( data => {
                    return data;
                  })
  )
}

}
