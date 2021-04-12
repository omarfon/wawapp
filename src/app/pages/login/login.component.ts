import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NotasService } from 'src/app/services/notas.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public msg;
  public authPublic;
  public logeo;
  public datos;
  public message;
  constructor(public router:Router,
              public alert: AlertController,
              public userSrv: UserService,
              public notasSrv: NotasService,
              public loadingCtrl: LoadingController) { 
                
              }
          
  ngOnInit() {
    
    const authorization = localStorage.getItem('authorization');
                if(!authorization){
                  this.userSrv.getKey().subscribe(data =>{
                    this.authPublic = data;
                    localStorage.setItem('authorization', this.authPublic.authorization);
                    localStorage.setItem('role', this.authPublic.role);
                  });
                }
    const notas = localStorage.getItem('notas');
    if(!notas){
      this.getAllNotes();
    }
  }

  getAllNotes(){
    this.notasSrv.getAllNotes().subscribe((data:any) => {
      console.log(data);
      const notasNoFilter = data.filter(x => x.type === 'bebecuidadoysalud' || x.type === 'bebenutricion' || x.type === 'bebefamilia' || x.type === 'bebevacunas' || x.type === 'bebehitos' || x.type === 'bebecuidado')
      localStorage.setItem('notas', JSON.stringify(notasNoFilter));
    })
  }

  async signIn(email, password){
    const loading = await this.loadingCtrl.create({
        message: 'Espere un momento por favor...'
    });
    await loading.present();
    this.userSrv.doSignIn(email, password).subscribe(data=>{
      this.logeo = data;
      loading.dismiss();
      console.log(this.logeo);
        this.msg ="";
        localStorage.setItem('userData', JSON.stringify(this.logeo));
        localStorage.setItem('authorization', this.logeo.authorization);
        localStorage.setItem('role', this.logeo.role);
        /* localStorage.setItem('idTokenUser', this.logeo.patientId);
        localStorage.setItem('emailUser', email);
        localStorage.setItem('patientName', this.logeo.patientName);
        localStorage.setItem('imagenPaciente' , this.logeo.photoUrl); */
        /* this.events.publish('user:logged', 'logged'); */
        this.router.navigate(['tabs/tab1'])
        /* this.navCtrl.setRoot(TabsPage); */
    },
  async err =>{
    loading.dismiss();
    const alert = await this.alert.create({
      header: '',
      message: "Email o Password incorrecto",
      buttons: [{
        text: "Volver a intentar",
        handler: data => {
          // console.log('intentar de nuevo');
        }
      }]
    });
    await alert.present();
  })
}

  register(){
    this.router.navigate(['register'])
  }

  async recovery(){
     const alert = await this.alert.create({
      header:'Recuperación de password',
      message:'Ingresa tu correo electrónico y enviaremos un mensaje con un código para la recuperación de tu cuenta',
      buttons :[
        {
          text: 'Enviar',
          cssClass: 'primary',
          handler: data => {
            let email = data.email;
            this.userSrv.sendValidation(email).subscribe((data:any) => {
              this.datos = data;
              if(this.datos.result = 'ok'){
                this.userSrv.recovery = this.datos;
                this.router.navigate(['recovery'])
              }else{
                this.message = this.datos.error.message;
              }
            })
          }
        }
      ],
      inputs:[
        {
          name: 'email',
          type:'text',
          placeholder:'Ingresa tu email'
        }
      ]
    })
    await alert.present();
  }
}
