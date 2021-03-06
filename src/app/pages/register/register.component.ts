import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
/* import * as shajs from 'sha.js'; */
import { ValidateService } from 'src/app/services/validate.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public msg: string;
  public registerForm: FormGroup;

  public pageFrom;
  public headquarterId;
  public specialty;
  public date;

  public hora;
  public available;
  public doctor;
  public texto;

  public resolve;
  public actual;
  public genders;
  public documents;

  public name;
  public email;
  public password;
  public phone;
  public surname1;
  public surname2;
  public sexo;
  public birthdate;
  cambio: boolean = false;
  aprobed: boolean = false;
  public documentNumber;
  public documentDigit;
  public registerFormu:boolean = false;
  public dniInvalid = false;
  public dataReniec: any = [];
  activateDocumentNumber: boolean;
  public document;
  documentId: any;
  public gender = {
    id: 0,
    name: ""
  };
  public _gender;
  public _documenType;
  createOk: any;
  tipoConsulta: any;
  escogido: any;
  hideBox: boolean = false;
  digitoVa: boolean = true;
  selectSexo: any;
  sexoValidate: boolean = false;
  public idgender;
  public namegender;
  public datos;
  public birthdateMostrar;
  constructor(public router: Router, 
              public userProvider: UserService,
              public alertctrl: AlertController,
              public navCtrl: NavController,
              public crudPrv: ValidateService,
              public loadingCtrl:LoadingController,
              public fb: FormBuilder,
              public dataPvr: DataService,
              public nav: NavController) { }

  ngOnInit() {
    this.actual = moment().format('YYYY-MM-DD');

    // console.log('fecha actual:',this.actual);
    this.dataPvr.getGenders().subscribe(datagenders => {
      this.genders = datagenders;
      console.log('this.genders:', this.genders);
    });

    this.dataPvr.getDocuments().subscribe(documents => {
      this.documents = documents;
      console.log('this.documents:', this.documents);
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname1: ['', [Validators.required]],
      surname2: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      documentDigit: ['']
    });

  }

  back(){
    this.nav.back();
  }

  //FUNCION PARA SELECCIONAR EL GENERO
  selecGender(event) {
    this.selectSexo = event.target.selectedOptions[0].textContent;
    this.sexo = event.target.value;
    if (this.sexo != this.selectSexo) {
      this.sexoValidate = true;
    } else {
      this.sexoValidate = false;
    }
  }

  //VALIDACI??N DE CAMPOS PARA EL DISABLED DEL BOTON REGISTRAR
  validacion(){
    if(this.password && this.aprobed == true && this.name && this.surname1 && this.surname2 &&  this.email && this.phone ){
      return true;
    }else{
      return false;
    }
  }

  //FUNCI??N PARA CAMBIAR EL GENERO Y METERLO EN UNA VARIABLE
  cambiogenero($event) {
    this._gender = this.gender;
    console.log('this.gender:', this._gender);

  }

  //METODO PARA CAPTAR EL ACEPTAR LAS CONDICIONES QUE ES PARTE PARA EL DISABLED
  aceptaCondiciones(aprobed){
    console.log('aprobed cambia a true:', aprobed);
    this.aprobed = true;
  }

  /* 
  VALIDACI??N DE DATOS RENIEC, SI EL PACIENTE EXISTE EN XHIS SE UTILIZAN LOS DATOS DEL XHIS, SINO EXISTE SE LLENAN LA MAYOR??A DE LOS CAMPOS
  CON LA DATA OBTENIDA EN ESTA LLAMADA */
  async reniecValidateDatos(){
    const loading = await this.loadingCtrl.create({
      message:'estamos buscando los datos...'
    });
    await loading.present();
    console.log(this.documentNumber, this.documentDigit , this.document);
    this.userProvider.getPublicKey(this.documentNumber).subscribe((data:any) => {
      this.dataReniec = data.data;
      console.log('this.dataReniec:',this.dataReniec);
      this.name = this.dataReniec.nombres;
      this.surname1 = this.dataReniec.apellido_paterno;
      this.surname2 = this.dataReniec.apellido_materno;
      this.sexo = this.dataReniec.sexo;
      this.birthdate = this.dataReniec.fecha_nacimiento;
      this.birthdateMostrar = moment(this.dataReniec.fecha_nacimiento).format('DD/MM/YYYY');

      this.registerFormu = true;
        if(this.documentNumber == this.dataReniec.numero  && this.documentDigit == this.dataReniec.codigo_verificacion){
          this.registerFormu = true;
        loading.dismiss();  
        }else{
          loading.dismiss();
          this.dniInvalid = true;
          this.registerFormu = false;
        }
  }, err => {
    loading.dismiss();
    this.dniInvalid = true;
    this.registerFormu = true;
    console.log(err)
  })
  }

  //ABRIR LA ALERTA DE VER CONDICIONES
  async seeConditions() {
    let terminos = await this.alertctrl.create({
      header: 'T??RMINOS Y CONDICIONES',
      message: 'Los siguientes t??rminos y condiciones de uso (en adelante, "T??rminos") son un acuerdo legal entre el usuario y Centros de Salud Peruanos S.A.C., RUC N?? con RUC N??20602393934, con domicilio en Jir??n Carlos Villar??n N??611, Urbanizaci??n Santa Catalina, Distrito de La Victoria, Provincia y Departamento de Lima, Per?? (en adelante "CSP" o "nosotros", " nos??? o "nuestro "), para establecer el marco legal y contractual aplicable al registro, uso, baja o interacci??n en la plataforma ofrecida por CSP para el acceso a los servicios que presta CL??NICA AVIVA y todas las aplicaciones m??viles o sitios web que pertenecen, operan, tienen licencia o est??n bajo el control de CSP (en adelante, ???Aplicaci??n m??vil???, ???Aplicaciones m??viles???, ???Sitio Web??? o "Sitios Web"). AL ACCEDER O UTILIZAR LAS APLICACIONES O SITIOS WEB, EL USUARIO SE COMPROMETE A RESPETAR ESTOS T??RMINOS Y NUESTRA POL??TICA DE PRIVACIDAD. SI NO EST?? DE ACUERDO CON ESTOS T??RMINOS, NO ACCEDA NI UTILICE LAS APLICACIONES O LOS SITIOS WEB  Al utilizar el Sitio Web o Aplicaciones M??viles, usted declara y garantiza que: usted tiene el poder legal y la autoridad para aceptar y estar sujeto a estos T??rminos; y, si nos ha proporcionado informaci??n como consecuencia del uso del Sitio Web, dicha informaci??n es verdadera y precisa. Facilitar informaci??n falsa, enga??osa o incorrecta puede dar lugar a responsabilidades tanto civiles como penales. Si tienes dudas al respecto, te recomendamos que consultes con tu asesor legal. El acceso y utilizaci??n del Sitio Web y Aplicaciones M??viles implica la declaraci??n expresa del usuario de conocer y aceptar plenamente todas las disposiciones, normas, instrucciones, responsabilidades y pol??ticas contenidas en los presentes T??rminos. En consecuencia, el usuario debe leer detenidamente los presentes T??rminos cada vez que acceda al Sitio Web, Aplicaciones M??viles y Servicios, pues podr??an sufrir variaciones o actualizaciones sin previo aviso, en atenci??n a nuevos requerimientos legales o por necesidades internas para cumplir con las mejores pr??cticas de negocio. Finalidad de la Aplicaci??n o el Sitio Web La finalidad de las Aplicaciones M??viles o del Sitio Web y es proporcionar a nuestros pacientes, usuarios y al p??blico en general (en adelante, los ???Usuarios??? o el ???Usuario???), una plataforma de acceso a los servicios m??dicos que presta CL??NICA AVIVA, as?? como a informaci??n de salud, propia o suministrada por CSP o sus empresas relacionadas relevantes para el usuario.La informaci??n suministrada de naturaleza m??dica tiene fines informativos y no sustituye el asesoramiento m??dico profesional, la ayuda, el diagn??stico o el tratamiento. Condiciones de uso de la Aplicaci??n o Sitio Web Los Usuarios aceptan que el uso de la Aplicaci??n o Sitio Web requiere de conectividad a Internet. En ese sentido, los Usuarios aceptan que CSP no se hace responsable por problemas de conectividad que limiten, restrinjan o impidan el uso. Los Usuarios entienden que la Aplicaci??n o el Sitio Web podr?? ser usado por todo el p??blico en general que tenga una conexi??n web. Sin embargo, CSP recomienda su uso s??lo a personas mayores de dieciocho (18) a??os de edad. Se encuentra prohibido el uso del Sitio Web o Aplicaciones M??viles por parte de los Usuarios para fines contrarios a las normas vigentes, el orden p??blico y las buenas costumbres. CSP podr?? enviar avisos de servicio, mensajes administrativos y otro tipo de informaci??n para la adecuada conectividad. Ser?? responsabilidad de los Usuarios mantener actualizados sus datos registrados en el Sitio Web y Aplicaciones M??viles, as?? como ejecutar las actualizaciones disponibles. En el supuesto que alguna de las disposiciones contenidas en los presentes T??rminos y Condiciones de Uso sea declarado ilegal, inv??lido o nulo, el resto de t??rminos quedar?? vigente y aplicable para cualquier supuesto. Para acceder a los servicios, el usuario crear?? una cuenta de acceso con nombre de usuario y contrase??a, por tanto, deber?? mantener la confidencialidad de la contrase??a pues el Usuario es responsable de la informaci??n personal y actividad que se desarrolle en su cuenta o a trav??s de ella. Si el Usuario debe cuidar de cerrar siempre la sesi??n a fin de evitar accesos indebidos por parte de terceros. Para asegurar la disponibilidad de las Aplicaciones m??viles y Sitio Web, as?? como la ausencia de errores en cualquier transmisi??n de informaci??n que pudiera tener lugar; CSP cuenta con el soporte necesario y adecuado. Sin perjuicio de ello, CSP no garantiza que el contenido del Sitio Web, Aplicaciones M??viles o Servicios ser?? ininterrumpido o libre de errores, que los defectos ser??n corregidos, o que los servicios o los servidores que hacen que el uso est?? disponible, se encuentren libre de virus u otros componentes da??inos. El Sitio Web y Aplicaciones M??viles pueden incluir inexactitudes t??cnicas o errores tipogr??ficos, y CSP puede hacer cambios o mejoras en cualquier momento. Asimismo, CSP no garantiza que el uso del Sitio Web, Aplicaciones m??viles y Servicios no infringir?? los derechos de terceros y no asume ninguna responsabilidad o responsabilidad por errores u omisiones en el contenido provisto. Limitaci??n de Responsabilidad En la medida en que la legislaci??n aplicable lo permita, CSP o cualquiera de sus gerentes, funcionarios, profesionales de salud, colaboradores, representantes, no ser??n responsables ante el usuario o ante cualquier tercero por cualquier da??o que surja de o en relaci??n con el uso del Sitio Web y Aplicaci??n M??vil. La Aplicaci??n o el sitio Web pueden contener enlaces a otros sitios Web controlados u ofrecidos por terceras personas. CSP declara que no se hace responsable en relaci??n a ninguna informaci??n, materiales, productos o servicios que aparezcan o que se ofrezcan en cualquiera de los sitios pertenecientes a terceras personas con enlaces a este sitio Web.  Derechos de Autor y Propiedad Intelectual El usuarios acepta que CSP es la ??nica y exclusiva titular sobre todas sus marcas registradas en el Per??, as?? como cualquier otra marca registrada, marcas de servicio y/o logotipos contenidos en la Aplicaci??n o el Sitio Web. En tal sentido, se encuentra expresamente prohibido que dichas marcas y/o logotipos sean copiadas, reproducidas, modificadas o utilizadas de cualquier manera sin autorizaci??n expresa de CSP.  Pol??tica de Protecci??n de Datos Personales:Al momento de registrarse en la Aplicaci??n o Sitio Web, el usuario deber?? registrar sus datos personales. Los datos personales que proporcione a CSP podr??an contener datos sensibles. En vista de ello, el usuario autoriza a CSP a recopilar y dar tratamiento (por s?? mismo o a trav??s de terceros) a sus datos personales, para que incluso pueda elaborar bases de datos con informaci??n sobre su nombre, apellido, edad, nacionalidad, estado civil, documento de identidad, ocupaci??n, domicilio, correo electr??nico, tel??fono celular, estado de salud, afecciones, preexistencias, que sean proporcionados por el usuario y/o sean recopilados o generados por CSP y/o cualquier tercero, como consecuencia de la utilizaci??n de la Aplicaci??n o Sitio Web, o como consecuencia de alguna otra relaci??n comercial que el usuario mantenga y/o haya mantenido con CSP. En ese sentido, a fin de dar tratamiento a la informaci??n conforme se indica en este documento, el usuario otorga a CSP su consentimiento libre, previo, expreso, inequ??voco e informado, para que (por s?? mismo o a trav??s de terceros) pueda: recopilar, registrar, organizar, almacenar, conservar, elaborar, modificar, bloquear, suprimir, extraer, consultar, utilizar, transferir, exportar, importar o procesar (tratar) de cualquier otra forma sus datos personales, conforme a Ley. El usuario declara conocer que los datos pueden ser alojados en plataformas cuyos servidores se encuentren en el extranjero, consintiendo el flujo transfronterizo de sus datos. Esta autorizaci??n es indefinida y estar?? vigente hasta que el usuario la revoque. El usuario tiene derecho a revocar en cualquier momento su consentimiento, comunicando su decisi??n por escrito a CSP quien podr?? informarle a trav??s de cualquier medio de comunicaci??n, sobre otros canales para que puedan hacer efectiva la revocatoria. Asimismo, el usuario declara haber sido informado que podr??n ejercer en cualquier momento sus derechos de acceso, rectificaci??n, cancelaci??n y oposici??n de sus datos de acuerdo a la legislaci??n vigente. Para ello efectuar?? su solicitud por escrito a CSP, quien podr?? informarle a trav??s de cualquier medio de comunicaci??n, sobre otros canales para que pueda hacer efectivo el ejercicio de sus derechos. CSP es titular y responsable de las bases de datos originadas por el tratamiento de los Datos Personales que recopile, los mismos que considerar?? como fidedignos, dado que el usuario los otorga en calidad de Declaraci??n Jurada. Asimismo, CSP declara que ha adoptado los niveles de seguridad apropiados para el resguardo de la informaci??n, respetando las medidas de seguridad t??cnica aplicables a cada categor??a y tipo de tratamiento de las Bases de Datos; asimismo, declara que respeta los principios de legalidad, consentimiento, finalidad, proporcionalidad, calidad, disposici??n de recurso, nivel de protecci??n adecuado, conforme a las disposiciones de la Ley de Protecci??n de Datos vigente en Per??. El usuario acepta y da su consentimiento a fin de que CSP le env??e por medios electr??nicos ofertas, promociones, comunicados, u otros an??logos sobre los servicios de salud que ofrece. Asimismo, declara conocer y acepta que algunos datos sean compartidos con otras empresas del Grupo INTERCORP y Grupo NEXUS, integrantes del mismo grupo empresarial de CSP, para efectos de ofrecerle beneficios, promociones y publicidad de los servicios que presten o bienes que ofrezcan. Ley Aplicable Estos T??rminos se regir??n e interpretar??n de acuerdo con las leyes de la Rep??blica del Per??. Asimismo, el Usuario declara su conformidad de someter cualquier discrepancia a la jurisdicci??n de los  jueces y tribunales de la Corte Superior de Justicia de Lima Norte. Modificaciones Los presentes T??rminos han sido actualizados a JUNIO 2019 y podr??n ser modificados por CSP en cualquier momento.',
      buttons: ['OK']
    });
    await terminos.present();
  }

  changue() {
    this.cambio = true;
  }

  // VALIDACI??N BOTON PARA LA BUSQUEDA POR DNI
validacionButton(){
  if(this.document && this.documentNumber && this.documentDigit){
    return true
  }else{
    return false
  }
}
// METODO QUE SE UTILIZA EN EL CAMBIO DE DOCUMENTO CONSIDERANDO QUE LA BUSQUEDA DE DATOS ES SOLO PARA EL DNI Y NO PARA EL RESTO DE DOCUMENTOS.
cambioDocument(event){
    this._documenType = this.document;
    console.log('this.document', this._documenType, this.document);
    const documentType = event.target.value;
    if (documentType === 'No Tiene') {
      this.hideBox = true;
    } else if(documentType.name === 'D.N.I'){
      this.registerFormu = false;
      this.dataReniec = null;
      this.digitoVa = true;
        this.hideBox = false;
        this.documentNumber = '';
        this.selectDocument = event.target.value;
        this.activateDocumentNumber = false;
        this.documentId = event.target.value;
    }else if(documentType.name === 'C.E.'){
      this.dataReniec = null;
      this.registerFormu = true;
      this.digitoVa = false;
      this.hideBox = false;
      this.documentNumber = '';
      this.selectDocument = event.target.value;
      this.activateDocumentNumber = false;
      this.documentId = 3;

      console.log(this.documentId);
    }else if(documentType.name === 'Pasaporte.'){
     this.dataReniec = null;
      this.registerFormu = true;
      this.digitoVa = false;
      this.hideBox = false;
      this.documentNumber = '';
      this.selectDocument = event.target.value;
      this.activateDocumentNumber = false;
      this.documentId = 2;
 
      console.log(this.documentId);
    }else{
     this.dataReniec = null;
      this.registerFormu = true;
      this.digitoVa = false;
      this.hideBox = false;
      this.documentNumber = '';
      this.selectDocument = event.target.value;
      this.activateDocumentNumber = false;
 
      this.documentId = event.target.value;
    }
   }


   selectDocument(event) {
  }


// FUNCI??N PARA REGISTRAR A UN USUARIO CUANDO HA LLENADO TODOS LOS DATOS.
  registerNewUser(){
    this.userProvider.sendValidationRegister(this.email,this.documentNumber, this.document.id, this.document.name).subscribe((resp:any)=>{
      if(resp.result == 'ok'){
        let data = this.registerForm.value;
        if(this.dataReniec){
          if(this.sexo === 'MASCULINO'){
            this.idgender = 2;
            this.namegender = 'HOMBRE';
          }else if(this.sexo === 'FEMENINO'){
            this.idgender = 3;
            this.namegender = 'MUJER';
          }else{
            this.idgender= 1;
            this.namegender = 'INDISTINTO';
          }
        }else{
          this.datos.gender.id = this._gender.id;
          this.datos.gender.name = this._gender.name;
        }
        this.datos ={
          email          : this.email,
          password       : this.password,
          name           : this.name,
          surname1       : this.surname1,
          surname2       : this.surname2,
          birthdate      : this.birthdate,
          gender         :{
              id         : this.idgender,
              name       : this.namegender
          },
          documentType   :{
              id         : this.document.id,
              name       : this.document.name
          },
          documentNumber : this.documentNumber,
          phone          : this.phone,
          origin         : 'wawapp'
        }
         this.datos.code = 1234;
         this.datos.id = resp.id ;
        this.datos.birthdate = moment(this.birthdate).format('YYYY-MM-DD');
        console.log('this.data: ',this.birthdate);
        console.log('this.data: ',this.datos);
        this.userProvider.registerNewUser(this.datos).subscribe(data =>{
          this.createOk = data;
          console.log('la vuelta de this.createOK:', this.createOk);
               console.log('datos que vienen del logueo: por registro:', this.createOk);
                 localStorage.setItem('authorization', JSON.stringify(this.createOk));
                 this.router.navigate(['/login']);
                 console.log("pas??!!!");
                 console.log('pas?? logeado', this.createOk);
                 if(localStorage.getItem('authorization')){
                  const token = localStorage.getItem('authorization.authorization');
                }
        }, err => {
          console.log('error de creaci??n');
        })
      }
    }, async err=>{
        console.log('err',err);
        this.registerForm.reset();
        if(err.error.result === 'error'){
          if(err.error.message == 'Ya tienes historia y usuario web'){
            const alert = await this.alertctrl.create({
              header:'Error de login',
              subHeader:'Ya tienes una cuenta',
              backdropDismiss:false,
              buttons:[
                {
                  text:'Recuperar o loguear',
                  handler:() =>{
                    this.router.navigate(['login']);
                  }
                }
              ]
            });
            await alert.present();
          }else{
            const alert = await this.alertctrl.create({
              header:'Error de login',
              subHeader:'Ya tienes una cuenta',
              backdropDismiss:false,
              buttons:[
                {
                  text:'Recuperar o loguear',
                  handler:() =>{
                    this.router.navigate(['login']);
                  }
                }
              ]
            });
            await alert.present();
          }
        }
    });
  }

  // VALIDACI??N PARA LA EXISTENCIA DEL EMAIL, SI EXISTE NO SE PODR??A CREAR UNA CUENTA, ES MUY PROBABLE QUE YA TENGA UNA CREADA.
  async mailExisting() {
    const alert = await this.alertctrl.create({
      header: "Correo Utilizado",
      message: "el correo que ha ingresado ya existe, talvez lo ingres?? mal o pruebe con otro",
      buttons: [
        {
          text: 'Intentar de nuevo',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }


//METODO PARA VOLVER AL LOGIN
  goToLogin() {
    this.router.navigate(['login']);
    /* this.navCtrl.push(LoginPage); */
  }

}
