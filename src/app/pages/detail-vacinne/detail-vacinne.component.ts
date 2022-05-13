import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { VaccinesService } from 'src/app/services/vaccines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-vacinne',
  templateUrl: './detail-vacinne.component.html',
  styleUrls: ['./detail-vacinne.component.scss'],
})
export class DetailVacinneComponent implements OnInit {
  vac : number;
  vacuna: any;
  _vacuna: any;
  vacunas;
  vacunasData;
  mes = 2;
  public fechaVacunacion;
  public vacunaAviva;
  public vacunaExterna;
  public fechaEstimada;
  public fecha;
  constructor(public vacinneSrv: VaccinesService,
              public loadingCtrl: LoadingController,
              public nav: NavController,
              public router: Router,
              public alrtCtrl: AlertController) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando información'
    });
    await loading.present();
    if(this.vacinneSrv.vacuna){
      this.vacuna = this.vacinneSrv.vacuna;
      if(this.vacuna){
        console.log('this.vacuna:', this.vacuna);
        /* this.fecha = this.vacuna[0].momento_dosis / 30; */
        // this.vacunasData = this.navParams.get('vacunas');
        console.log('lo que hay en this.vac:', this.vacuna);
        this.fechaVacunacion = this.vacuna[0].info_paciente.fecha_aplicacion_dosis;
        this.vacunaAviva = this.vacuna[0].info_paciente.administracion_externa;
        this.fechaEstimada = this.vacuna[0].info_paciente.fecha_programada_dosis;
        this.vacunaExterna = this.vacuna[0].info_paciente.estado;
        console.log('fechaEstimada:', this.fechaEstimada);
      }else{
        loading.dismiss();
      }
      const mes = this.vacinneSrv.month;
      this.vacinneSrv.getVaccine(mes).subscribe((data:any) =>{
        console.log(data);
        if(data[0].enfermedades.length < 1 || data.length < 1){
          this.router.navigate(['tabs/tab3']);
          loading.dismiss();
        }else{
          this.vacunas = data[0].enfermedades[0].vacunas;
          loading.dismiss();
        }
          loading.dismiss();
          console.log('vacunas en detail vacunas:', this.vacunas);
      },err => {
        console.log(err);
        this.router.navigate(['tabs/tab3'])
        loading.dismiss();
      });
    }else{
      loading.dismiss();
      this.router.navigate(['tabs/tab3'])
    }
  }

  async sendAlertVaccine(){
    let alerta = await this.alrtCtrl.create({
        header: 'Hemos creado una alerta para esta {{vac.nombre}}',
        message: 'Te avisaremos un par de días antes para que puedas programar tu cita o ir a la clínica.',
        buttons: ['OK']
    });
    await alerta.present();
  }

  updateVacuna(){
    console.log('nuevo estado de vacuna:' + this.vacuna);
  }
  back(){
    this.nav.back();
  }

}
