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
  slideOpts = {
    pager: true,
    slidesPerView: 1.08
  }
  constructor(public nav: NavController,
              public loading: LoadingController,
              public estimuloSrv: EstimulosService) { }

  ngOnInit() {
    this.getStimulus();
  }

  // FUNCIÓN PARA REGRESAR UNA VEZ EN LAS PÁGINAS.
  back(){
    this.nav.back();
  }

  /* 
  ESTE LLAMADO SE UTILIZA PARA OBTENER LA LISTA DE ESTIMULOS QUE ESTA CREADA Y ALMACENADA EN EL GESTOR DE CONTENIDOS Y PODER REENDERIZARLA A DEMANDA, ESTO SE OBTIENE EN LA CARGA INICIAL DE LA PAGINA Y ES INDEPENDIENTE DE LA EDAD DEL BEBÉ,
  */
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
