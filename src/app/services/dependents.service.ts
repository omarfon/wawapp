import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl, environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DependentsService {

  private SERVER = apiUrl;
  private apiUrl = `${this.SERVER}users/dependents`;
  private apiOldDates = `${this.SERVER}ebooking/encuentrosPaciente`;
  /* private apiDatesParents = `${this.SERVER}ebooking/appointments/patientContacts`; */
  private apiDatesParents = `${this.SERVER}ebooking/citas-paciente-contactos`;
  public dependens;
  public appointment;
  public id;
  constructor(public http: HttpClient) { }

  getDependens(){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    return this.http.get(this.apiUrl, {headers}).pipe(
                    map(data =>{
                      return data;
                    })
                  )
  }

  getOldDependetsDay(){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    return this.http.get(this.apiOldDates, {headers}).pipe(
                map(data =>{
                  return data;
                })
              )
        }

  getdependesDay(){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    return this.http.get(this.apiDatesParents, {headers}).pipe(
                map(data =>{
                  return data;
                })
             )
        }
}
