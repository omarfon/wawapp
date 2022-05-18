import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ParematersService } from 'src/app/services/parematers.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],

})
export class ParametersComponent implements OnInit {
  private c;
  private patientId;
  private id;
  public _parametros;
  public parametros;
  constructor(public nav: NavController,
              public parametersSrv: ParematersService,
              public loading: LoadingController,
              public userSrv: UserService) { }

  async ngOnInit() {
    const loading = await this.loading.create({
      message: 'cargando parametros del control...'
    });
    await loading.present();
    this.c = this.userSrv.content;
    this.patientId = this.userSrv.userId;
    if(this.c){
      this.id = this.c.encuentro;
    }
    console.log(this.c, this.id);
    this.getParameters();
    loading.dismiss();
  }

  // FUNCIÓN PARA OBTENER LOS PARAMETROS DE UNA CONSULTA ESPECIFICA REALIZADA CON ANTERIORIDAD.
  getParameters(){
    this.parametersSrv.getParametersPerId(this.patientId, this.id).subscribe(data =>{
      this._parametros = data;
      console.log('this.parametros:', this._parametros);
      this.parametros = this._parametros[0].parametros;
      })
  }

  // FUNCIÓN PARA RETROCEDER
  back(){
    this.nav.back();
  }
}
