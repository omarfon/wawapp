import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NotasService } from 'src/app/services/notas.service';
import { UserService } from 'src/app/services/user.service';
import { DataService } from '../../services/data.service';



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
  public documents;
  public data;
  public tipeDocument;
  constructor(public router:Router,
              public alert: AlertController,
              public userSrv: UserService,
              public notasSrv: NotasService,
              public dataSrv: DataService,
              public loadingCtrl: LoadingController) { 
                
              }
          
  ngOnInit() {
    
    const authorization = localStorage.getItem('authorization');
                if(!authorization){
                  this.userSrv.getKey().subscribe(data =>{
                    this.authPublic = JSON.stringify(data);
                    localStorage.setItem('authorization', this.authPublic);
                    localStorage.setItem('role', this.authPublic.role);
                  });
                }else{
                  this.getDocuments();
                }
    const notas = localStorage.getItem('notas');
    if(!notas){
      this.getAllNotes();
    }

  }

  getDocuments(){
    this.dataSrv.getDocuments().subscribe(data => {
      this.documents = data;
      console.log(this.documents);
  });
}

  getAllNotes(){
    this.notasSrv.getAllNotes().subscribe((data:any) => {
      console.log(data);
      const notasNoFilter = data.filter(x => x.type === 'bebecuidadoysalud' || x.type === 'bebenutricion' || x.type === 'bebefamilia' || x.type === 'bebevacunas' || x.type === 'bebehitos' || x.type === 'bebecuidado')
      localStorage.setItem('notas', JSON.stringify(notasNoFilter));
    })
  }

/*   async signIn(document, password){
    const loading = await this.loadingCtrl.create({
        message: 'Espere un momento por favor...'
    });
    await loading.present();
    this.userSrv.doSignIn(document, password).subscribe(data=>{
      this.logeo = data;
      loading.dismiss();
      console.log(this.logeo);
        this.msg ="";
        localStorage.setItem('userData', JSON.stringify(this.logeo));
        localStorage.setItem('authorization', this.logeo.authorization);
        localStorage.setItem('role', this.logeo.role);
        this.router.navigate(['tabs/tab1'])
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
} */

signIn(document, password) {
  console.log(this.tipeDocument,document, password) 
  this.userSrv.newLoginWithDni(this.tipeDocument, document, password).subscribe(async response => {
    this.data = response;
    console.log('lo que me trae el login:', this.data);
    if (this.data.sex == 'HOMBRE') {
      const alert = await this.alert.create({
        header: "LO SENTIMOS",
        subHeader: "Esta aplicación es de uso exclusivo para pacientes de sexo femenino",
        buttons: [
          {
            text: 'ok',
            role: 'cancel'
          }
        ]
      })
      await alert.present();
    } else {
      localStorage.setItem('authorization', JSON.stringify(this.data));
      localStorage.setItem('sigIn', 'completo');
      localStorage.setItem('role', this.data.role);
      localStorage.setItem('token', this.data.firebaseToken);
/*       localStorage.setItem('usuario', this.data.userEmail);
      localStorage.setItem('email', this.data.userEmail);
      localStorage.setItem('id', this.data.patientId);
      localStorage.setItem('photoUrl', this.data.photoUrl);
      localStorage.setItem('patientName', this.data.patientName);
      localStorage.setItem('name', this.data.name);
      localStorage.setItem('uid', this.data.userId); */
      this.router.navigate(['tabs/tab1'])
      /* localStorage.setItem('uid', this.data.userId); */
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
      }
    }
  }, async error => {
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
    // this.msgError = error.message;
    }
  );
}

  register(){
    this.router.navigate(['register'])
  }

/*   async recovery(){
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
  } */

  async recovery(){
    const alert = await this.alert.create({
      header:"Olvidaste tu contraseña...?",
      message:'Ingresa tu N° de documento para recuperar',
      inputs :[
        {
          name:'documento',
          placeholder:'Ingresa tu n° de documento',
          type: 'text'
        }
      ],
      buttons :[
          {
            text:'Enviar',
            handler: data => {
              console.log('enviando correo electronico');
              let document = data.documento;
              console.log('lo que se almacena en correo:', document);
              const dataSend = {
                documentNumber:  data.documento,
                documentType: {
                  id:"1",
                  name:"D.N.I"
                },
                app: 'ebooking'
              }
              this.userSrv.recoveryLogin(dataSend).subscribe(data =>{
                  this.datos = data;
                  console.log('this.datos:', this.datos);
                  if(this.datos.result == 'ok'){
                    this.userSrv.recoveryData = this.datos;
                    this.userSrv.dataSend = dataSend;
                    this.router.navigate(['recovery']);
                  }else{

                  console.log('correo no valido levantar un alert o pintar un mensaje')
                  }
              })
            }
          }
      ]
    });
   await alert.present(); 
  }


  selectDocument(d){
    const document = d.target.value;
    this.tipeDocument = document.id.toString();
    console.log(this.tipeDocument);
  }

}
