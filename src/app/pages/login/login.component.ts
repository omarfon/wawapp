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
    
  }

  //CARGAMOS EN EL CICLO DE VIDA CARACTERISTICO DE IONIC LA AUTHORIZATION QUE CONTIENE EL JWT Y TAMBIEN LOS TIPOS DE DOCUMENTOS QUE SE UTILIZAN EN EL LOGIN.
  ionViewWillEnter(){
    const authorization:any = localStorage.getItem('authorization');
      if(!authorization) {
        this.userSrv.getKey().subscribe((data: any) => {
          localStorage.setItem('authorization', JSON.stringify(data));
          this.getDocuments();
        })
      }else{
        this.getDocuments();
      }
      console.log('constructor');
  }

  // METODO PARA OBTENER LOS TIPOS DE DOCUMENTOS.
  getDocuments(){
    this.dataSrv.getDocuments().subscribe((data:any) => {
      this.documents = data;
      this.documents = this.documents.filter(document => document.name !== 'No Tiene');
      console.log(this.documents);
  });
}

// INICIAMOS LA CARGA DE LAS NOTAS DESDE EL LOGIN PARA PODER MOSTRARLAS EN LA PAGINA INTERIOR Y REDUCIR TIEMPOS DE CARGA.
  getAllNotes(){
    this.notasSrv.getAllNotes().subscribe((data:any) => {
      console.log(data);
      const notasNoFilter = data.filter(x => x.type === 'bebecuidadoysalud' || x.type === 'bebenutricion' || x.type === 'bebefamilia' || x.type === 'bebevacunas' || x.type === 'bebehitos' || x.type === 'bebecuidado')
      localStorage.setItem('notas', JSON.stringify(notasNoFilter));
    })
  }


  // FUNCIÓN PARA LOGUEAR A UN USUARIO, Y GUARDADO EN EL LOCALSTORAGE DATOS IMPORTANTES PARA SU
signIn(document, password) {
  console.log(this.tipeDocument,document, password) 
  this.userSrv.newLoginWithDni(this.tipeDocument, document, password).subscribe(async response => {
    this.data = response; 
      localStorage.setItem('authorization', JSON.stringify(this.data));
      localStorage.setItem('sigIn', 'completo');
      localStorage.setItem('role', this.data.role);
      localStorage.setItem('token', this.data.firebaseToken);
      this.router.navigate(['tabs/tab1'])
      /* localStorage.setItem('uid', this.data.userId); */
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
      }
  }, async error => {
    const alert = await this.alert.create({
      header: '',
      message: "Email o Password incorrecto",
      buttons: [{
        text: "Volver a intentar",
        handler: data => {
        }
      }]
    });
    await alert.present();
    }
  );
}

// METODO PARA EL ENRUTAMIENTO HACIA LA PAGINA DE REGISTRO
  register(){
    this.router.navigate(['register'])
  }

  // FUNCIÓN QUE LEVANTA UN MODAL EN DONDE SE INGRESA EL NUMERO DE DOCUMENTO, PARA LA RECUPERACIÓN DE LA CONTRASEÑA.
  async recovery(){
    const alert = await this.alert.create({
      header:"Olvidaste la contraseña...?",
      message:'Ingresa tu N° de documento para recuperarla',
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
/*               console.log('enviando correo electronico'); */
              let document = data.documento;
      /*         console.log('lo que se almacena en correo:', document); */
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
                      return
                  }
              })
            }
          }
      ]
    });
   await alert.present(); 
  }

// FUNCIÓN PARA SELECCIONAR EL TIPO DE DOCUMENTO.
  selectDocument(d){
    const document = d.target.value;
    this.tipeDocument = document.id.toString();
    console.log(this.tipeDocument);
  }

}
