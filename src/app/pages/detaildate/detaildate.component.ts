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

  ngOnInit() {
      this.appointment = this.dependentsSrv.appointment;
      this.id = this.dependentsSrv.id;
  }

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
  /*         enableBackdropDismiss: true */
        });
        confirm.present();
      }

      back(){
        this.nav.back();
      }

      dismiss(){
        this.nav.back();
      }
}
