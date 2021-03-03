import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { EstimulosService } from 'src/app/services/estimulos.service';


@Component({
  selector: 'app-estimulacion',
  templateUrl: './estimulacion.component.html',
  styleUrls: ['./estimulacion.component.scss'],
})
export class EstimulacionComponent implements OnInit {
  public estimulos;
  constructor(public nav: NavController,
              public loading: LoadingController,
              public estimuloSrv: EstimulosService) { }

  ngOnInit() {
    this.getStimulus();
  }

  back(){
    this.nav.back();
  }

  async getStimulus(){
    const loading = await this.loading.create({
        message: 'Cargando datos...'
    });
    await loading.present();
    this.estimuloSrv.getDataEstimulation().subscribe(data => {
      this.estimulos = data;
      loading.dismiss();
      console.log(this.estimulos);
    })
  }
}
