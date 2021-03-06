import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { DependentsService } from 'src/app/services/dependents.service';
import { DetaildateComponent } from '../detaildate/detaildate.component';


@Component({
  selector: 'app-mydates',
  templateUrl: './mydates.component.html',
  styleUrls: ['./mydates.component.scss'],
})
export class MydatesComponent implements OnInit {
  public appointments;
  public encuentros;
  public sinCitas;
  public dependentsAppointments;
  constructor(public dependetsSrv: DependentsService,
              public router: Router,
              public loading: LoadingController,
              public nav: NavController,
              public appointmentSrv: AppoinmentService) { }
/* 
ESTE COMPONENTE SE ENCARGA DE TRAER INFORMACIÓN DE CITAS PENDIENTES */
async ngOnInit() {
    const loading = await this.loading.create({
      message: 'cargando citas'
    })
    await loading.present();
    this.dependetsSrv.getdependesDay().subscribe(data =>{
      this.dependentsAppointments = data;
      if(this.dependentsAppointments){
         this.appointments = this.dependentsAppointments.filter(x => x.appointments) ;
         loading.dismiss();           
      }else{
        this.appointments = 0;
      } 
    }, err => {
      this.loading.dismiss();
      this.appointments = 0;
    });
    
  }


// METODO QUE SIRVE PARA IR A LA PAGINA DE DETALLE DE LA CITA PENDIENTE Y ENVIA ALGUNOS CAMPOS NECESARIOS PARA LA RENDERIZACIÓN
  goToDetail(e, id){
    console.log('e:' ,e, id);
    this.dependetsSrv.appointment = e;
    this.dependetsSrv.id = id;
    this.router.navigate(['detail-date']);
   }

   // RETROCEDER
   back(){
     this.nav.back();
   }
} 
