import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CitasService {
  servicios: any[] = [];
  doctores: any[] = [];
  private SERVER = apiUrl;
  public dataDate;
  constructor(public http: HttpClient) { }

  getServicios( ){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    const center_id = 1;
    return this.http.get(this.SERVER + `ebooking/fmt-centers/${center_id}/services`, {headers}).pipe(
                        map((resp:any)=>{
                          return resp;
                      })
            )
  }


  getDoctorsPerId(id){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    const center_id = 1;

    return this.http.get(this.SERVER + `ebooking/fmt-centers/${center_id}/services/${id}/professionals` ,  {headers}).pipe(
                    map((resp:any)=>{
                    this.doctores = resp.centers[0].services[0].professionals;
                    return this.doctores;
                    })/* .catch(e =>{
                      return Observable.of(e)
                    }) */
    )
  }

  getDoctorsPerIdFilter(id, provision){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    const center_id = 1;

    return this.http.get(this.SERVER + `ebooking/fmt-centers/${center_id}/basicservices/${id}/provision/${provision}/professionals` ,  {headers}).pipe(
                    map((resp:any)=>{
                    this.doctores = resp.centers[0].services[0].professionals;
                    return this.doctores;
                    })/* .catch(e =>{
                      return Observable.of(e)
                    }) */
    )
  }

  getDoctorsSpecialty(id, date1: any, date2: any) {
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    return this.http
      .get(this.SERVER + 'ebooking/fmt-centers/1/services/' + id + '/professionals/all/availables?from_date=' + date1 + '&to_date=' + date2, {headers});
  }


  getAvailablesPerDoctor(id, escogido, serviceId, fromDate, toDate, ){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    const center_id = 1;
    return this.http.get(this.SERVER + `ebooking/fmt-centers/${center_id}/basicservices/${serviceId}/professionals/${id}/provision/${escogido}/availables?from_date=${fromDate}&to_date=${toDate}`,  {headers}).pipe(
                      map((resp:any)=>{
                      /* console.log('resp:', resp); */
                        return resp.centers[0].services[0].professionals[0].availables;
                        // return resp;
                      })
    )
  }
  
}
