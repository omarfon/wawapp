import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { DependentsService } from 'src/app/services/dependents.service';
import { API_IMAGES } from 'src/environments/environment';

@Component({
  selector: 'app-detaildate',
  templateUrl: './detaildate.component.html',
  styleUrls: ['./detaildate.component.scss'],
})
export class DetaildateComponent implements OnInit {
  public appointment;
  public id;
  public API_IMAGES = API_IMAGES;
  constructor(public nav: NavController,
              public router:Router,
              public appointmentPrv: AppoinmentService,
              public dependentsSrv: DependentsService,
              public alertCtrl: AlertController) { }
/* 
    AQUI SE OBTIENE LA DATA QUE LLEGA DESDE RECIPES Y ES ENVIADA DESDE EL SERVICIO DEPENDENTSSERVICE
*/
  ngOnInit() {
    const data = this.dependentsSrv.appointment
    if(data){
      this.appointment = this.dependentsSrv.appointment;
      console.log(this.appointment)
      this.id = this.dependentsSrv.id;
    }else{
      this.router.navigate(['mydates'])
    }
  }

  // FUNCIÓN PARA CANCELAR UNA CITA.
  async desactivateTask(appointment){
    console.log('appointment:', appointment);
        let confirm = await this.alertCtrl.create({
          header: 'ANULAR CITA',
          message: '¿Estas seguro que quieres eliminar esta cita?',
          buttons: [
            {
              text: 'SI',
              handler: data => {
                  this.appointmentPrv.destroyAppointmentContact(appointment).subscribe( data => {
                    this.router.navigate(['tabs']);
                  });
              }
            },
            {
              text: 'NO',
              handler: () => {
                return true;
              }
            }
          ],
        });
        confirm.present();
      }

      // FUNCIÓN PARA VOLVER A LA PAGINA ANTERIOR.
      back(){
        this.nav.back();
      }

      //DESTRUCCIÓN DE NAVEGACIÓN A LA PANTALLA ANTERIOR.
      dismiss(){
        this.nav.back();
      }
}
