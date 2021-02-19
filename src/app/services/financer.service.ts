import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancerService {
  private SERVER = apiUrl;
  public dataDoctorFInancer;
  public patientId;
  constructor(public http: HttpClient) { }

  getFinancers(){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    return this.http.get(this.SERVER + 'ebooking/planes-paciente', {headers}).pipe(
                    map(data => {
                      return data
                  })
    )
  

}

getPrice(servicio_id, prestacion_id, producto_id, medico_id, proposed_date) {
  // let params = { proposed_date: proposed_date, center_id: center_id, basic_service_id: basic_service_id, doctor_id: doctor_id }
  const authorization = localStorage.getItem('authorization');
  let headers = new HttpHeaders({"Authorization": authorization});
  return this.http.get(this.SERVER + `ebooking/citas/precio-prestacion?servicio_id=${servicio_id}&prestacion_id=${prestacion_id}&producto_id=${producto_id}&medico_id=${medico_id}&fecha=${proposed_date}`, {headers}).pipe(
                  map(data => {
                    return data
                  })
  )
}

getPlanesPaciente(centerId, servicio_id, prestacion_id, medico_id, proposed_date){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization":authorization});

    return this.http.get(this.SERVER + `ebooking/planes-paciente-precio-prestacion?center_id=${centerId}&servicio_id=${servicio_id}&prestacion_id=${prestacion_id}&medico_id=${medico_id}&fecha=${proposed_date}`, {headers}).pipe(
                    map(data=>{
                      return data
                    })
    )
}

}
