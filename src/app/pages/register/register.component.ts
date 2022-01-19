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

  selecGender(event) {
    this.selectSexo = event.target.selectedOptions[0].textContent;
    this.sexo = event.target.value;
    if (this.sexo != this.selectSexo) {
      this.sexoValidate = true;
    } else {
      this.sexoValidate = false;
    }
  }

  validacion(){
    if(this.password && this.aprobed == true && this.name && this.surname1 && this.surname2 &&  this.email && this.phone ){
      return true;
    }else{
      return false;
    }
  }

  cambiogenero($event) {
    this._gender = this.gender;
    console.log('this.gender:', this._gender);

  }

  aceptaCondiciones(aprobed){
    console.log('aprobed cambia a true:', aprobed);
    this.aprobed = true;
  }

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
      this.birthdate = moment(this.dataReniec.fecha_nacimiento).format('DD/MM/yyyy');
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

  async seeConditions() {
    let terminos = await this.alertctrl.create({
      header: 'TÉRMINOS Y CONDICIONES',
      message: 'Los siguientes términos y condiciones de uso (en adelante, "Términos") son un acuerdo legal entre el usuario y Centros de Salud Peruanos S.A.C., RUC N° con RUC N°20602393934, con domicilio en Jirón Carlos Villarán N°611, Urbanización Santa Catalina, Distrito de La Victoria, Provincia y Departamento de Lima, Perú (en adelante "CSP" o "nosotros", " nos” o "nuestro "), para establecer el marco legal y contractual aplicable al registro, uso, baja o interacción en la plataforma ofrecida por CSP para el acceso a los servicios que presta CLÍNICA AVIVA y todas las aplicaciones móviles o sitios web que pertenecen, operan, tienen licencia o están bajo el control de CSP (en adelante, “Aplicación móvil”, “Aplicaciones móviles”, “Sitio Web” o "Sitios Web"). AL ACCEDER O UTILIZAR LAS APLICACIONES O SITIOS WEB, EL USUARIO SE COMPROMETE A RESPETAR ESTOS TÉRMINOS Y NUESTRA POLÍTICA DE PRIVACIDAD. SI NO ESTÁ DE ACUERDO CON ESTOS TÉRMINOS, NO ACCEDA NI UTILICE LAS APLICACIONES O LOS SITIOS WEB  Al utilizar el Sitio Web o Aplicaciones Móviles, usted declara y garantiza que: usted tiene el poder legal y la autoridad para aceptar y estar sujeto a estos Términos; y, si nos ha proporcionado información como consecuencia del uso del Sitio Web, dicha información es verdadera y precisa. Facilitar información falsa, engañosa o incorrecta puede dar lugar a responsabilidades tanto civiles como penales. Si tienes dudas al respecto, te recomendamos que consultes con tu asesor legal. El acceso y utilización del Sitio Web y Aplicaciones Móviles implica la declaración expresa del usuario de conocer y aceptar plenamente todas las disposiciones, normas, instrucciones, responsabilidades y políticas contenidas en los presentes Términos. En consecuencia, el usuario debe leer detenidamente los presentes Términos cada vez que acceda al Sitio Web, Aplicaciones Móviles y Servicios, pues podrían sufrir variaciones o actualizaciones sin previo aviso, en atención a nuevos requerimientos legales o por necesidades internas para cumplir con las mejores prácticas de negocio. Finalidad de la Aplicación o el Sitio Web La finalidad de las Aplicaciones Móviles o del Sitio Web y es proporcionar a nuestros pacientes, usuarios y al público en general (en adelante, los “Usuarios” o el “Usuario”), una plataforma de acceso a los servicios médicos que presta CLÍNICA AVIVA, así como a información de salud, propia o suministrada por CSP o sus empresas relacionadas relevantes para el usuario.La información suministrada de naturaleza médica tiene fines informativos y no sustituye el asesoramiento médico profesional, la ayuda, el diagnóstico o el tratamiento. Condiciones de uso de la Aplicación o Sitio Web Los Usuarios aceptan que el uso de la Aplicación o Sitio Web requiere de conectividad a Internet. En ese sentido, los Usuarios aceptan que CSP no se hace responsable por problemas de conectividad que limiten, restrinjan o impidan el uso. Los Usuarios entienden que la Aplicación o el Sitio Web podrá ser usado por todo el público en general que tenga una conexión web. Sin embargo, CSP recomienda su uso sólo a personas mayores de dieciocho (18) años de edad. Se encuentra prohibido el uso del Sitio Web o Aplicaciones Móviles por parte de los Usuarios para fines contrarios a las normas vigentes, el orden público y las buenas costumbres. CSP podrá enviar avisos de servicio, mensajes administrativos y otro tipo de información para la adecuada conectividad. Será responsabilidad de los Usuarios mantener actualizados sus datos registrados en el Sitio Web y Aplicaciones Móviles, así como ejecutar las actualizaciones disponibles. En el supuesto que alguna de las disposiciones contenidas en los presentes Términos y Condiciones de Uso sea declarado ilegal, inválido o nulo, el resto de términos quedará vigente y aplicable para cualquier supuesto. Para acceder a los servicios, el usuario creará una cuenta de acceso con nombre de usuario y contraseña, por tanto, deberá mantener la confidencialidad de la contraseña pues el Usuario es responsable de la información personal y actividad que se desarrolle en su cuenta o a través de ella. Si el Usuario debe cuidar de cerrar siempre la sesión a fin de evitar accesos indebidos por parte de terceros. Para asegurar la disponibilidad de las Aplicaciones móviles y Sitio Web, así como la ausencia de errores en cualquier transmisión de información que pudiera tener lugar; CSP cuenta con el soporte necesario y adecuado. Sin perjuicio de ello, CSP no garantiza que el contenido del Sitio Web, Aplicaciones Móviles o Servicios será ininterrumpido o libre de errores, que los defectos serán corregidos, o que los servicios o los servidores que hacen que el uso esté disponible, se encuentren libre de virus u otros componentes dañinos. El Sitio Web y Aplicaciones Móviles pueden incluir inexactitudes técnicas o errores tipográficos, y CSP puede hacer cambios o mejoras en cualquier momento. Asimismo, CSP no garantiza que el uso del Sitio Web, Aplicaciones móviles y Servicios no infringirá los derechos de terceros y no asume ninguna responsabilidad o responsabilidad por errores u omisiones en el contenido provisto. Limitación de Responsabilidad En la medida en que la legislación aplicable lo permita, CSP o cualquiera de sus gerentes, funcionarios, profesionales de salud, colaboradores, representantes, no serán responsables ante el usuario o ante cualquier tercero por cualquier daño que surja de o en relación con el uso del Sitio Web y Aplicación Móvil. La Aplicación o el sitio Web pueden contener enlaces a otros sitios Web controlados u ofrecidos por terceras personas. CSP declara que no se hace responsable en relación a ninguna información, materiales, productos o servicios que aparezcan o que se ofrezcan en cualquiera de los sitios pertenecientes a terceras personas con enlaces a este sitio Web.  Derechos de Autor y Propiedad Intelectual El usuarios acepta que CSP es la única y exclusiva titular sobre todas sus marcas registradas en el Perú, así como cualquier otra marca registrada, marcas de servicio y/o logotipos contenidos en la Aplicación o el Sitio Web. En tal sentido, se encuentra expresamente prohibido que dichas marcas y/o logotipos sean copiadas, reproducidas, modificadas o utilizadas de cualquier manera sin autorización expresa de CSP.  Política de Protección de Datos Personales:Al momento de registrarse en la Aplicación o Sitio Web, el usuario deberá registrar sus datos personales. Los datos personales que proporcione a CSP podrían contener datos sensibles. En vista de ello, el usuario autoriza a CSP a recopilar y dar tratamiento (por sí mismo o a través de terceros) a sus datos personales, para que incluso pueda elaborar bases de datos con información sobre su nombre, apellido, edad, nacionalidad, estado civil, documento de identidad, ocupación, domicilio, correo electrónico, teléfono celular, estado de salud, afecciones, preexistencias, que sean proporcionados por el usuario y/o sean recopilados o generados por CSP y/o cualquier tercero, como consecuencia de la utilización de la Aplicación o Sitio Web, o como consecuencia de alguna otra relación comercial que el usuario mantenga y/o haya mantenido con CSP. En ese sentido, a fin de dar tratamiento a la información conforme se indica en este documento, el usuario otorga a CSP su consentimiento libre, previo, expreso, inequívoco e informado, para que (por sí mismo o a través de terceros) pueda: recopilar, registrar, organizar, almacenar, conservar, elaborar, modificar, bloquear, suprimir, extraer, consultar, utilizar, transferir, exportar, importar o procesar (tratar) de cualquier otra forma sus datos personales, conforme a Ley. El usuario declara conocer que los datos pueden ser alojados en plataformas cuyos servidores se encuentren en el extranjero, consintiendo el flujo transfronterizo de sus datos. Esta autorización es indefinida y estará vigente hasta que el usuario la revoque. El usuario tiene derecho a revocar en cualquier momento su consentimiento, comunicando su decisión por escrito a CSP quien podrá informarle a través de cualquier medio de comunicación, sobre otros canales para que puedan hacer efectiva la revocatoria. Asimismo, el usuario declara haber sido informado que podrán ejercer en cualquier momento sus derechos de acceso, rectificación, cancelación y oposición de sus datos de acuerdo a la legislación vigente. Para ello efectuará su solicitud por escrito a CSP, quien podrá informarle a través de cualquier medio de comunicación, sobre otros canales para que pueda hacer efectivo el ejercicio de sus derechos. CSP es titular y responsable de las bases de datos originadas por el tratamiento de los Datos Personales que recopile, los mismos que considerará como fidedignos, dado que el usuario los otorga en calidad de Declaración Jurada. Asimismo, CSP declara que ha adoptado los niveles de seguridad apropiados para el resguardo de la información, respetando las medidas de seguridad técnica aplicables a cada categoría y tipo de tratamiento de las Bases de Datos; asimismo, declara que respeta los principios de legalidad, consentimiento, finalidad, proporcionalidad, calidad, disposición de recurso, nivel de protección adecuado, conforme a las disposiciones de la Ley de Protección de Datos vigente en Perú. El usuario acepta y da su consentimiento a fin de que CSP le envíe por medios electrónicos ofertas, promociones, comunicados, u otros análogos sobre los servicios de salud que ofrece. Asimismo, declara conocer y acepta que algunos datos sean compartidos con otras empresas del Grupo INTERCORP y Grupo NEXUS, integrantes del mismo grupo empresarial de CSP, para efectos de ofrecerle beneficios, promociones y publicidad de los servicios que presten o bienes que ofrezcan. Ley Aplicable Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República del Perú. Asimismo, el Usuario declara su conformidad de someter cualquier discrepancia a la jurisdicción de los  jueces y tribunales de la Corte Superior de Justicia de Lima Norte. Modificaciones Los presentes Términos han sido actualizados a JUNIO 2019 y podrán ser modificados por CSP en cualquier momento.',
      buttons: ['OK']
    });
    await terminos.present();
  }

  changue() {
    this.cambio = true;
  }

validacionButton(){
  if(this.document && this.documentNumber && this.documentDigit){
    return true
  }else{
    return false
  }
}

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

/*   registerNewUser() {
    let data = this.registerForm.value;
    console.log('data de formulario:', data);
    let datos: any = {
      email: data.email,
      password: data.password,
      name: data.name,
      surname1: data.surname1,
      surname2: data.surname2,
      birthdate: data.birthdate,
      gender: {
        id: this._gender.id,
        name: this._gender.name
      },
      documentType: {
        id: this._documenType.id,
        name: this._documenType.name
      },
      documentNumber: data.documentNumber,
      phone: data.phone
    }
    data.code = 1234;
    data.id = "sendbooking";

    data.birthdate = moment(data.birthdate).format('YYYY-MM-DD');
    console.log('this.data: ', data.birthdate);
    console.log('this.data: ', data);
    console.log('data armada:', data);
    this.userProvider.createNewUser(data).subscribe(async (data: any) => {
      this.createOk = data;
      console.log('la vuelta de this.createOK:', this.createOk);
      const alert = await this.alertctrl.create({
        header:'Creación de cuenta',
        message:'la creación ha sido exitosa, ingresa tus credenciales',
        buttons: [
          {
            text:'Ok'
          }
        ]
      });
      await alert.present();
      console.log('datos que vienen del logueo: por registro:', this.createOk);
      localStorage.setItem('idTokenUser', this.createOk.patientId);
      localStorage.setItem('emailUser', this.createOk.userEmail);
      localStorage.setItem('authorization', this.createOk.authorization);
      localStorage.setItem('role', this.createOk.role);
      localStorage.setItem('photoUrl', this.createOk.photoUrl);
      localStorage.setItem('name', this.createOk.name);
      localStorage.setItem('patientName', this.createOk.patientName);
      localStorage.setItem('token', this.createOk.firebaseToken);
      localStorage.setItem('token', data.firebaseToken);
      localStorage.setItem('uid', data.userId);
      localStorage.setItem('sigIn', 'completo');
        this.router.navigate(['/login']);
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
      }
    }, async err => {
      const alert = await this.alertctrl.create({
        header: 'Error en el envio del código',
        message: `${err.error.message}`,
        buttons: [{
          text: 'Intentar de nuevo',
          role: 'cancel'
        }]
      });
      await alert.present();
    });
  }
 */

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
          phone          : this.phone
        }
         this.datos.code = 1234;
         this.datos.id = resp.id ;
        this.datos.birthdate = moment(this.birthdate).format('YYYY-MM-DD');
        console.log('this.data: ',this.birthdate);
        console.log('this.data: ',this.datos);
        this.userProvider.createNewUser(this.datos).subscribe(data =>{
          this.createOk = data;
          console.log('la vuelta de this.createOK:', this.createOk);
               console.log('datos que vienen del logueo: por registro:', this.createOk);
                 localStorage.setItem('authorization', JSON.stringify(this.createOk));
                 this.router.navigate(['/login']);
                 console.log("pasó!!!");
                 console.log('pasó logeado', this.createOk);
                 if(localStorage.getItem('authorization')){
                  const token = localStorage.getItem('authorization.authorization');
                }
        }, err => {
          console.log('error de creación');
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

  async mailExisting() {
    const alert = await this.alertctrl.create({
      header: "Correo Utilizado",
      message: "el correo que ha ingresado ya existe, talvez lo ingresó mal o pruebe con otro",
      buttons: [
        {
          text: 'Intentar de nuevo',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }



  goToLogin() {
    this.router.navigate(['login']);
    /* this.navCtrl.push(LoginPage); */
  }

}
