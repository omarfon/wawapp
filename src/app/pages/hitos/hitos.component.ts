import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { HitosService } from 'src/app/service/hitos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hitos',
  templateUrl: './hitos.component.html',
  styleUrls: ['./hitos.component.scss'],
})
export class HitosComponent implements OnInit {
  public hitos;
  public _hitos;
  public porhacer;
  public hechas;
  public sinLograr;
  public slideOptions = {
    slidesPerView: 1.4,
  }
  constructor(public nav: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public hitosSrv: HitosService) { }

  ngOnInit() {
    // FUNCIÓN QUE SE ENCARGA DE TRAER TODOS LOS HITOS INDEPENDIENTEMENTE SI ESTAN LOGRADOS O NO
    this.hitosSrv.getHitos().subscribe(data =>{
      this.hitos = data;
      this.porhacer = this.hitos.filter(h => !h.fecha);
      this.hechas = this.hitos.filter(f => f.fecha);
  console.log('trayendo hitos:', this.hitos);
      this.sinLograr = this.hitos.length;
    });
  }

  // FUNCIÓN QUE SIRVE PARA CAMBIAR DE ESTADO UN HITO.
  async idChanged(e, hito){
    const loading = await this.loadingCtrl.create({
      message:'guardando cambios'
    });
    await loading.present();
    console.log(e);
    console.log('hito:', hito);
    let id = hito.id;
    const titulo = hito.titulo;
    const mes = hito.mes;
    this.hitosSrv.addHito(id).subscribe(data =>{
        this.hitosSrv.getHitos().subscribe(data =>{

          Swal.fire(" Logrado!", `has logrado ${titulo} del ${mes} mes`, "success");  
          this.hitos = data;
          this.porhacer = this.hitos.filter(h => !h.fecha);
          this.hechas = this.hitos.filter(f => f.fecha);
        });
        loading.dismiss();
    });
  }

  // FUNCIÓN PARA DESMARCAR UN HITO LOGRADO.
  async uncheckHito(hito){
    const loading = await this.loadingCtrl.create({
      message:'regresando a lista pendiente'
    })
    await loading.present();
    const id = hito.id;
      const alert = await this.alertCtrl.create({
        header:'Regresar este hito a la lista',
        message:'con esta acción este hito volverá a la lista de no logrado',
        buttons:[
          {
            text:'continuar',
            handler:() =>{
              this.hitosSrv.deleteHito(id).subscribe(data =>{
                this.hitosSrv.getHitos().subscribe(data =>{
                  this.hitos = data;
                  this.porhacer = this.hitos.filter(h => !h.fecha);
                  this.hechas = this.hitos.filter(f => f.fecha);
                });
              });
            }
          },
          {
            text:'cancelar',
            role:'cancel'
          }
        ]
      });
      await alert.present();
      loading.dismiss();
  }

  // FUNCIÓN PARA RETROCEDER UNA PAGINA
  back(){
    this.nav.back();
  }
}
