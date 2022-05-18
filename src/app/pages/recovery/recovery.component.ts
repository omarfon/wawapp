import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { CrudparentService } from 'src/app/services/crudparent.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent implements OnInit {
  public datos;
  public formCode: FormGroup;
  public code;
  public logeo;
  public notasks;
  public primero;
  public segundo;
  public tercero;
  public cuarto;
  public recoveryData;
  public dataSend;
  constructor(public crudSrv: CrudparentService,
              public router: Router,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public form: FormBuilder,
              public nav: NavController,
              public userSrv: UserService) { }

              /* 
              SE CREA UN FORMULARIO QUE ALMACENE LOS DIGITOS RECIBIDOS POR EL USUARIO, QUE SE COMPLEMENTAN CON LOS DATOS QUE RECIBE A LA HORA DE SOLICITAR 
              LA RECUPERACIÓN EN TODO MOMENTO AL USUARIO NO SE LE PERMITE CONOCER EL CORREO AL CUAL SE LE HA ENVIADO LA INFORMACIÓN SOLO SE LE DA UNA SEÑA DE CUAL SERÍA SU CORREO. */
  ngOnInit() {
    this.datos = this.userSrv.recovery;
    this.formCode = this.form.group({
      primero : [],
      segundo : [],
      tercero : [],
      cuarto  : [],
      password   : ['', [Validators.required]],
      passwordRepeat   : ['', [Validators.required]]
  });
  this.recoveryData = this.userSrv.recoveryData;
    this.dataSend = this.userSrv.dataSend;
    console.log(this.recoveryData, this.dataSend);
   
  }

  //METODO PARA VALIDAR QUE LAS CONTRASEÑAS ENVIADAS SON IGUALES
  validacion(){
    const valid = this.formCode.value;
    if(valid.password == valid.passwordRepeat){
      return true;
    }else{
      return false;
    }
  }

  /* 
  FUNCIÓN QUE ENVIA LA DATA Y GENERA EL CAMBIO DE CONTRASEÑA CORRESPONDIENTE */
  async saveData(data){
    const loading = await  this.loadingCtrl.create({
      message: 'cambiando contraseña'
    });
    await loading.present();
    let datos = {
      code:`${this.primero}${this.segundo}${this.tercero}${this.cuarto}`,
      documentType: this.dataSend.documentType,
      dni:this.dataSend.documentNumber,
      id:this.recoveryData.id,
      password:this.formCode.value.password
    }
    console.log(datos);
  this.userSrv.loginRecovery(datos).subscribe(data => {

        this.logeo = data;
        console.log(data);
        this.logeo = data;
        if(data){
              console.log('this.logeo:', this.logeo);
              this.loadingCtrl.dismiss();
              this.recoverySuccess();
              this.router.navigate(['login']);
        }
      },err =>{
        console.log('el logeo:', this.logeo, err);
        this.logeo = err;
        this.loadingCtrl.dismiss();
          this.erroCode();
      });
}

// METODO QUE NOTIFICA SI LA CUENTA FUE RECUPERADA CON UN ALERT
async recoverySuccess(){
  const alert = await this.alertCtrl.create({
    header:"Cuenta recuperada",
    message:"su cuenta se ha recuperado exitosamente, ahora haga login",
    buttons: [
      {
        text:'ok'
      }
    ]
  })
  await alert.present();
}

//METODO QUE NOTIFICA SI EL CODIGO ES ERRONEO
async erroCode(){
  const alert = await this.alertCtrl.create({
    header:`Error en la recuperación`,
    message:`${this.logeo.error.message}`,
    buttons: ['volver a intentar']
  });
  await alert.present();
}

// ROUTER PARA VOLVER AL LOGIN
goToLogin(){
  this.router.navigate(['login']);
  /* this.navCtrl.setRoot(LoginPage); */
}

// FUNCIÓN DE RETROCESO.
back(){
  this.nav.back();
}

}
