import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, apiUrl, apiCms } from 'src/environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VaccinesService {
  public vacuna;
  private SERVER = apiUrl;
  private SERVERCMS = apiCms;
  apiUrl = `${this.SERVER}ebooking/dosis-calendario-vacunacion/2?groupby=momento_dosis`;
  apiVaccine = `${this.SERVER}ebooking/dosis-calendario-vacunacion-paciente`;
  apiDetail = `${this.SERVER}wawa/data?type=bebevacuna&mes=`; 
  
  constructor(public http: HttpClient) { }

  getAllVaccines(){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    // console.log('params:', params);
    return this.http.get(this.SERVER + 'wawa/data?type=bebevacuna&order=asc' , {headers}).pipe(
                      map(data =>{
                        return data
                        })
                      )
       }
       
  getAllVaccinesPerUser(id){
    console.log("el id que me llega", id);
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    return this.http.get(this.apiVaccine + `/1803/2?groupby=momento_dosis` , {headers}).pipe(
                  map(data =>{
                    return data
                  })
                )
              /*   return this.http.get(this.apiVaccine + `/${id}/2?groupby=momento_dosis` , {headers}).pipe(
                  map(data =>{
                    return data
                  })
                ) */
        }
      
  getVaccine(mes){
    console.log('lo que me llega del mes:', mes);
    // const authorization = localStorage.getItem('authorization');
    // let headers = new HttpHeaders({"Authorization": authorization});
    // console.log('params:', params);
    return this.http.get(this.apiDetail + `${mes}` ).pipe(
                    map(data =>{
                      return data
                    })
                  )
        }

}
