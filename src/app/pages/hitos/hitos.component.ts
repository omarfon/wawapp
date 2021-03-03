import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HitosService } from 'src/app/service/hitos.service';

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
              public hitosSrv: HitosService) { }

  ngOnInit() {
    this.hitosSrv.getHitos().subscribe(data =>{
      this.hitos = data;
      this.porhacer = this.hitos.filter(h => !h.fecha);
      this.hechas = this.hitos.filter(f => f.fecha);
      console.log('trayendo hitos:', this.hitos);
      console.log('hitos sin fecha:', this.porhacer);
      this.sinLograr = this.hitos.length;
    });
  }

  idChanged($event, hito){
    console.log('hito:', hito);
    let id = hito.id;
    const titulo = hito.titulo;
    const mes = hito.mes;
    this.hitosSrv.addHito(id,).subscribe(data =>{
        this.hitosSrv.getHitos().subscribe(data =>{
          // const alert = this.alertCtrl.create({
          //   title: 'Hito logrado',
          //     message:`has logrado ${titulo} del ${mes} mes`,
          //     buttons:[
          //       {
          //         text:'ok',
          //         role:'cancel'
          //       }
          //     ]
          // });
          // alert.present();
          /* swal(" Logrado!", `has logrado ${titulo} del ${mes} mes`, "success"); */
          this.hitos = data;
          this.porhacer = this.hitos.filter(h => !h.fecha);
          this.hechas = this.hitos.filter(f => f.fecha);
        });
        // this._hitos = this.hitos;
        console.log('nueva tabla de hitos:', this.hitos);
    });
  }

  async uncheckHito(hito){
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
  }

  back(){
    this.nav.back();
  }
}
