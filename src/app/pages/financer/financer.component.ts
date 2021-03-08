import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { CitasService } from 'src/app/services/citas.service';
import { CrudparentService } from 'src/app/services/crudparent.service';
import { DependentsService } from 'src/app/services/dependents.service';
import { FinancerService } from 'src/app/services/financer.service';


@Component({
  selector: 'app-financer',
  templateUrl: './financer.component.html',
  styleUrls: ['./financer.component.scss'],
})
export class FinancerComponent implements OnInit {
  public dataCita;
  public items;
  public price;
  public _price;
  isAndroid: boolean = false;

  public doctor; //doctor seleccionado//
  public available; //fecha seleccionada//
  public hora; // fecha seleccionada

  myEnsuranceName: string;
  firtClick: boolean = false;
  isInsurance: boolean = false;
  isInsuranceName: boolean = false;
  isCard: boolean = false;
  name: any;
  card: number;
  isPlace: boolean = false;
  payment: boolean = false;
  secure: boolean;
  nameSecure: String;
  financier_id: string;
  paymentName: String;
  appointment: any;
  user_id;
  paymentType: string;
  open: boolean = false;

  myForm: FormGroup;
  pase;
  public hour;
  public subida;
  pay;
  currentAppointment = null;
  personOk: boolean = false;
  addFamily: boolean = false;
  secureOk: boolean = false;
  depe;
  public parents;
  vcolor = false;
  ccolor = false;
  yes = false;
  no = false;
  public prestacion;
  public planes;
  public desabilitado: boolean = false;
  public nomark: boolean = false;
  public paquete = true;
  public _hora;
  public provision;
  public plan;
  dataArmada: any;
  encuentro: any;
  financer: boolean;
  constructor(public citasSrv: CitasService,
              public fb: FormBuilder,
              public router: Router,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public financeSrv: FinancerService,
              public dependentsPvr: DependentsService,
              public appointmetPvr: AppoinmentService,
              public nav: NavController,
              public crudPrv: CrudparentService) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'un momento por favor...'
    });
    loading.present();
    const data = this.citasSrv.dataDate;
    this.dataArmada = data;
    this.available = this.dataArmada.proposedate;
    this.prestacion = this.dataArmada.prestacion[0];
    console.log(data);

    this.dataCita = this.citasSrv.dataDate;
    console.log(this.dataCita);

    console.log('this.dataArmada:', this.dataArmada);
    this.hora = this.dataArmada.hora;
    this.doctor = this.dataArmada.doctor;
    this.subida = this.dataArmada.hora.listjson;
    this.encuentro = this.dataArmada.encuentro;
    this.available = this.dataArmada.proposedate;;

    console.log('this.encuentro:', this.encuentro);

    this.dependentsPvr.getDependens().subscribe(data => {
      this.parents = data
      /* console.log('this.parents:', this.parents); */
    });

    this.openParents();
    this.financeSrv.getFinancers().subscribe(data => {
      this.items = data;
      /* console.log('los financiadores:', data); */
      // this.items.shift();
    });
    loading.dismiss();


    /* this.isAndroid = platform.is('android'); */

    this.subida = this.hora.listjson;
    let role = localStorage.getItem('role');
    if (role == 'guest') {
      let datos =
      {
        hora: this.hora,
        doctor: this.doctor,
        available: this.available
      };
      this.router.navigate(['login', datos]);
      // datos.present();
    } else {
      console.log("si hay constraseña. que pase");
    }
  }

  evaluateEnsurance() {
    this.firtClick = !this.firtClick;
    this.isInsurance = false;
    this.isInsuranceName = true;
    this.payment = false;
    this.isPlace = false;
    this.isCard = false;
  }

  async planesPaciente() {
    const loading = await this.loadingCtrl.create({
      message: 'cargando financiadores'
    });
    await loading.present()
    let centerId = this.hora.params.centerId;
    let servicio_id = this.hora.params.serviceId;
    let prestacion_id = this.hora.params.provisionId;
    let medico_id = this.doctor.id;
    this.financeSrv.getPlanesPaciente(centerId, servicio_id, prestacion_id, medico_id, this.available).subscribe(data => {
      this.planes = data;
      loading.dismiss();
      console.log('this.planes:', this.planes);
    });
  }


  // si la cita es para el usuario pasará mostrando la ventana de financiador
  passFinancer(depe) {
    this.personOk = !this.personOk;
    this.personOk = true;
    this.addFamily = false;
    this.depe = depe;
    this.vcolor = true;
    this.ccolor = false;
    this.price = null;
    this.desabilitado = false;

    this.planesPaciente();

  }

  // mostrar los familiares adjuntos o la opción de crear uno nuevo
  openParents() {
    this.addFamily = true;
    this.personOk = false;
    this.desabilitado = true;
    this.ccolor = true;
    this.vcolor = false;
    this.nomark = false;
    this.planes = [];
  }

  passFinancerParent(depe) {
    this.addFamily = false;
    this.personOk = true;
    this.depe = depe;
    this.vcolor = false;
    this.ccolor = true;
    this.desabilitado = false;

    console.log('depe', depe);

    let paciente_id = depe.patientId;
    let servicio_id = this.hora.params.serviceId;
    let prestacion_id = this.hora.params.provisionId;
    let medico_id = this.doctor.id;
    this.financeSrv.getplanesContacto(paciente_id, servicio_id, prestacion_id, medico_id, this.available).subscribe(data => {
      this.planes = data;
      console.log(this.planes);
    })
  }

  cleanDepe() {
    this.secureOk = false;
    this.depe = {};
    this.openParents()
    // console.log(this.depe);
    // this.personOk = false;
    // this.vcolor = false;
    // this.ccolor = false;
    this.nomark = false;
  }

  // mostrar el modal de la creación de familiares
  /* async showDetailCreateParents() {
    const data = {
      doctor: this.doctor,
      available: this.available,
      hora: this.hora,
      depe: this.depe,
      price: this.price,
      prestacion: this.prestacion
    };
    const modal = await this.modalCtrl.create({
      component: CreateparentPage,
      componentProps: data,
      cssClass: 'my-custom-classParets'
    })
    await modal.present();
  } */

  async acceptFinancer(plan) {
    if (plan.siteds === 1) {
      this.paquete = true;
      this.financer = false
      const alert = await this.alertCtrl.create({
        header: 'Reserva con seguro',
        subHeader: 'podrás registrar tu cita y pagar en local, el monto a cobrar será el copago de tu aseguradora',
        buttons: [
          {
            text: 'entiendo'
          }
        ]
      });
      alert.present();
    } else {
      this.paquete = false;
      this.financer = true;
    }
    this.plan = plan;
    this.nomark = true;
    this.desabilitado = true;
    this.plan = plan;
    this.price = plan.precio[0].total;
    console.log('el plan:', plan);
  }

  async acceptFinancerPaquete(plan) {
    if (plan.codigo_garante_pk === 1) {
      this.paquete = true;
      this.financer = false
      const alert = await this.alertCtrl.create({
        header: 'Reserva con plan materno',
        subHeader: 'Podras registrar tu consulta con los beneficios de tu plan seleccionado.',
        buttons: [
          {
            text: 'entiendo'
          }
        ]
      });
      alert.present();
    } else {
      this.paquete = false;
      this.financer = true;
    }
    this.plan = plan;
    this.nomark = true;
    this.desabilitado = true;
    this.plan = plan;
    if (this.plan.precio[0].total) {
      this.price = plan.precio[0].total;
    } else {
      this.price = 0;
    }
    console.log('el plan:', plan);
  }

  // función para ir a pagos
  async goToPay() {
    if (this.price > 0) {
      console.log('precio y plan', this.price, this.plan);
      let data = {
        doctor: this.doctor,
        available: this.available,
        hora: this.hora,
        depe: this.depe,
        price: this.price,
        prestacion: this.prestacion,
        plan: this.plan
      };
      this.financeSrv.dataPago = data
      this.router.navigate(['pay'])
      console.log('el precio', this.price, this.prestacion);
    } else {
      if (this.currentAppointment == true) {
        const loading = await this.loadingCtrl.create({
          message: "creando cita"
        });
        await loading.present();
        let provisionId = this.hora.params.provisionId;
        this.appointmetPvr.createAppointment(this.subida, provisionId).subscribe(data => {
          // console.log("se ha creado la cita");
          this.createCita();
          loading.dismiss();
          this.router.navigate(['home']);
          /* this.navCtrl.setRoot(HomePage); */
        });
      } else {
        const alert = await this.alertCtrl.create({
          header: "Creación de cita",
          message: "la cita que reservaste ha sido creada satisfactoriamente.",
          buttons: [
            {
              text: "Ok",
              role: "Cancel"
            }
          ]
        });
        await alert.present();
      }
      this.router.navigate(['home']);
      /* this.navCtrl.setRoot(HomePage); */
    }
  }

  async createCita() {
    const alert = await this.alertCtrl.create({
      header: "Creación de cita",
      message: "la cita que reservaste ha sido creada satisfactoriamente.",
      buttons: [
        {
          text: "Ok",
          role: "Cancel"
        }
      ]
    });
    await alert.present();
  }

  doSubmitData() {
    let data = this.parents
    console.log('la data pasado por el modal:', data);
  }


  next() {
    if (this.prestacion == 44) {
      let provisionId = this.prestacion;
      console.log(provisionId);
      this.appointmetPvr.createAppointment(this.subida, provisionId).subscribe(async (data: any) => {
        console.log('data devuelta:', data);
        let appointmentId = data.appointmentId;
        if (data.ok == false) {
          this.problemReserva(data);
        } else {
          const loading = await this.loadingCtrl.create({
            message: "creando cita"
          });
          await loading.present();
          this.createCita();
          loading.dismiss();
          this.router.navigate(['home']);
        }
      }, async err => {
        if (this.prestacion === 44) {
          const alert = await this.alertCtrl.create({
            header: "Error de Creación",
            subHeader: `Su cita no ha podido crearse por, ${err.error.help}`,
            buttons: [
              {
                text: 'Ok entiendo',
                handler: () => {
                  this.router.navigate(['home']);
                }
              },
              {
                text: 'Pagar en clínica',
                handler: () => {
                  this.router.navigate(['/']);
                }
              }
            ]
          })
          await alert.present();
          console.log('err', err);
        } else {
          const alert = await this.alertCtrl.create({
            header: "Error de Creación",
            subHeader: `Su cita no ha podido crearse por, ${err.error.help}`,
            buttons: [
              {
                text: 'Ok entiendo',
                handler: () => {
                  this.router.navigate(['home']);
                }
              },
              {
                text: 'buscar nueva',
                handler: () => {
                  this.router.navigate(['options']);
                }
              }

            ]
          })
          await alert.present();
          console.log('err', err);
        }
      });
    } else {
      let provisionId = this.prestacion;
      console.log(provisionId);
      this.appointmetPvr.createAppointment(this.subida, provisionId).subscribe(async (data: any) => {
        console.log('data devuelta:', data);
        let appointmentId = data.appointmentId;
        if (data.ok == false) {
          this.problemReserva(data);
        } else {
          this.createCita();
          this.confirmCreate(appointmentId);
          this.router.navigate(['home']);
        }
      });
    }
  }

  confirmCreate(appointmentId) {
    this.appointmetPvr.confirmDate(appointmentId).subscribe(confirm => {
      console.log({ confirm });
    })
  }

  confirmCreateParent(patientId, appointmentId) {
    this.appointmetPvr.confirmDateParent(patientId, appointmentId).subscribe(confirm => {
      console.log({ confirm })
    })
  }

  /*  nextDepe() {
     this.crudPrv.createParentDate(this.subida, id, this.encuentro).subscribe(async data => {
       const appointmentId = data.appointmentId;
       const patientId = data.patient.id;
       const loading = await this.loadingCtrl.create({
         message: "creando cita"
       });
       await loading.present();
       this.createCita();
       this.router.navigate(['home']);
       loading.dismiss();
       if (data) {
         this.confirmCreateParent(patientId, appointmentId);
       }
     }, async err => {
       console.log('error en la creación:', err);
       const alert = await this.alertCtrl.create({
         header: "Error de Creación",
         subHeader: `Su cita no ha podido crearse por, ${err.error.help}`,
         buttons: [
           {
             text: 'Ok entiendo',
             handler: () => {
               this.router.navigate(['home'])
             }
           },
           {
             text: 'buscar nueva',
             handler: () => {
               this.router.navigate(['options'])
             }
           }
         ]
       })
       await alert.present();
       console.log('err', err);
 
     });
   } */

  async problemReserva(data) {
    const alert = await this.alertCtrl.create({
      header: "Problema de reserva",
      message: `${data.error.help}`,
      buttons: [
        {
          text: 'Buscar otro horario',
          handler: () => {
            this.router.navigate(['card']);
            /* this.navCtrl.push(CardPage); */
          }
        }, {
          text: 'cancelar',
          handler: () => {
            this.router.navigate(['home']);
            /* this.navCtrl.push(HomePage); */
          }
        }
      ]
    });
    await alert.present();
  }

  async openModalInfo() {
    const alert = await this.alertCtrl.create({
      header: 'Cuota Pendiente',
      message: 'Tienes una cuota pendiente, igual podrás registrar tu cita, pero tendrás que acercarte antes a admisión para regularizar',
      buttons: [
        {
          text: 'Entiendo'
        }
      ]
    });
    await alert.present();
  }

  goToBack(){
    this.nav.back();
  }


}
