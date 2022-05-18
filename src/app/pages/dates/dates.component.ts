import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { CitasService } from 'src/app/services/citas.service';
import { FinancerService } from 'src/app/services/financer.service';
import { UserService } from 'src/app/services/user.service';
import { API_IMAGES } from 'src/environments/environment';


@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
})
export class DatesComponent implements OnInit {
  c: any;
  servicios: any;
  disponibles: boolean;
  public doctors;
  public doctorsF;
  id: any;
  fromDate: any;
  toDate: any;
  horas: any;
  dia: any;
  dias: any;
  selectedDay: any;
  hora: any;
  public doctores;

  public available;
  public complete: boolean = false;


  itemExpanded: boolean = true;
  itemExpandHeight: number = 220;
  changueColor: Boolean = false;
  public apiEndpoint;
  consultaExterna: any;
  teleconsulta: any;
  escogido: number;
  public panelOpenState: boolean;
  public boxID: any;
  public boxCaID: any;
  public manyBoxes;
  public datesCalendar;
  public SERVERImage = API_IMAGES;
  constructor(public router: Router,
              public nav: NavController,
              public loadingCtrl: LoadingController,
              public citasSrv: CitasService,
              public userSrv: UserService,
              public finanSrv: FinancerService) { }

  ngOnInit() {
    this.escogido = 44;
    this.id = 39;
    this.fromDate = moment().format('YYYY-MM-DD');
    this.toDate = moment(this.fromDate).add(5, 'days').format('YYYY-MM-DD');
    this.getDoctors();
  }

  /*
    ESTE COMPONENTE SE ENCARGAR DE TRAER LOS DATOS DE LA ESPECIALIDAD DE GINECOLOGÍA PREVENTIVA, EN ESTE MOMENTO ESTA ON EL ID 38, PERO ESTO ES ALGO QUE TIENE QUE ESCALAR EN FUNCIÓN
    DESPUES DE LOS CENTROS, ES DECIR TRABAJARLO CON MULTISEDE, ADEMMÁS EL DATO DE LA ESPECIALIDAD DEBE VENIR DINAMICAMENTE, ESTO ES ALGO QUE TIENE QUE CONTRUIRSE EN EL FUTURO, EN ESTE
    MOMENTO SIRVE DE ESTA MANERA.
  */
  back(){
    this.nav.back();
  }


  // LLAMA A LOS DOCTORES DE UNA ESPECIALIDAD ESPECIFICA EN UN RANGO DE 15 DÍAS(ESTO ESTA REGULADO EN EL BACK)
  async getDoctors(){
    this.doctorsF = [];
    const loading = await this.loadingCtrl.create({
      message:"cargando especialistas"
    });
    await loading.present();
    this.citasSrv.getDoctorsSpecialty(this.id,this.fromDate, this.toDate).subscribe((doctors:any) => {
      const docts = doctors.centers[0].services[0].professionals.filter((element) => {
        return element.availables.length > 0;
      })
      this.manyBoxes = docts.length;
      docts.forEach(element => {
        const fech = element.availables;
        this.datesCalendar = fech;
      });
      this.doctorsF = docts;
      loading.dismiss();
      console.table(this.doctorsF);
    })
  } 

  //EN ESTA FUNCIÓN SE OBTIENE LAS HORAS DE UN DÍA ESPECIFICO, DE UN DOCTOR ESPECIFICO.
  expandedItem(doctor, available) {
    if (!this.hora) {
      console.log('doctor y available:', doctor, available); 
      this.selectedDay = available;
      let id = doctor.id;
      let serviceId = doctor.service.id;
      let fromDate = this.selectedDay.date;
      let toDate = this.selectedDay.date;
      this.citasSrv.getAvailablesPerDoctor(id, this.escogido, serviceId, fromDate, toDate).subscribe(hoy => {
        const dates = hoy[0].hours;
        if (this.escogido === 44) {
          this.consultaExterna = dates.filter(x => x.params.provisionId[0] === 44);
          this.dias = this.consultaExterna
          console.log('this.consultaExterna:', this.consultaExterna);
        } else {
          this.teleconsulta = dates.filter(x => x.params.provisionId[0] === 845337);
          this.dias = this.teleconsulta
        }
        this.doctors.map((listDoctor) => {
          if (doctor == listDoctor) {
            listDoctor.expanded = true;
          } else {
            listDoctor.expanded = false;
          }
          return listDoctor
        });
        this.horas = this.dias;
        this.dia = available.date;
      })
    } else {
      this.selectedDay = available;
      let id = doctor.id;
      let serviceId = doctor.service.id;
      let fromDate = this.selectedDay.date;
      let toDate = this.selectedDay.date;
      this.citasSrv.getAvailablesPerDoctor(id, this.escogido, serviceId, fromDate, toDate).subscribe(hoy => {
        this.dias = hoy[0].hours;
        this.doctors.map((listDoctor) => {
          if (doctor == listDoctor) {
            listDoctor.expanded = true;
          } else {
            listDoctor.expanded = false;
          }
          return listDoctor
        });
        this.horas = this.dias;
        this.dia = available.date;
      })
    }
  }

  stateShow(item: any, index, items) {
    console.log(item, index, items);
    this.boxID = item;
    this.boxCaID = index;
    this.selectedDay = items;
  }

  // MANEJO DE ERROR AL NO RECIBIR UNA IMAGEN DE UN ESPECIALISTA ADECUADO.
  errorHandler(event) {
    event.target.src = "https://1.bp.blogspot.com/-p8EFlkXywyE/UDZvWTyr1bI/AAAAAAAAEU0/xL8pmKN1KOY/s1600/facebook.png"
  }

  // METODO PARA ENVIAR A FINANCIADOR CON LOS DATOS NECESARIOS PARA REGISTRO Y OBTENCIÓN DE PRECIOS.
  goToFinancer(doctor, hora) {
    const datos = {
      centerId: hora.params.centerId,
      servicio_id: hora.params.serviceId,
      prestacion: hora.params.provisionId,
      medico_id: doctor.id,
      proposedate: this.selectedDay.date,
      hora: hora,
      encuentro: this.escogido,
      doctor: {
        id: doctor.id,
        fullname: doctor.fullName,
        info: doctor.info,
        service: doctor.service,
        cmp: doctor.cmp
      }
    }
    this.citasSrv.dataDate = datos;
    const user = localStorage.getItem('role')
    if (user === 'public') {
      this.router.navigate(['/register'])
    } else {
      this.router.navigate(['financer']);
    }
  }
}
