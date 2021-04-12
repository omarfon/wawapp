import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { CrudparentService } from 'src/app/services/crudparent.service';
import { CulqiService } from 'src/app/services/culqi.service';
import { FinancerService } from 'src/app/services/financer.service';
import { API_IMAGES } from 'src/environments/environment';


declare var Culqi: any;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {
  currentAppointment = null;
  public subida;
  public hour;
  public price;
  public pago;
  public depe;
  public dependCreate;
  public title;
  public amount;
  public description;
  public payCulqiCharges: boolean = true;
  public retrying: boolean = false;
  public alertError: any;
  public dataArmada;
  public doctor; //doctor seleccionado//
  public available; //fecha seleccionada//
  public hora; // fecha seleccionada
  /* public culqiData; */
  public prestacion;
  public SERVERImage = API_IMAGES; 
  public plan;
  public desactivadoBoton = true;
  public desactivadoBotonLocal = true;
  public culqiReturn;
  public appointmentId;
  public check;
  public patientId: any;
  public i;
  vuelta: any;

  constructor(public culqiSrv: CulqiService,
              public alertCtrl: AlertController,
              public crudPvr: CrudparentService,
              public router: Router,
              public appointmentPrv: AppoinmentService,
              public loadingCtrl: LoadingController,
              public financerSrv: FinancerService,
              public modalCtrl: ModalController) { 
                const data = this.financerSrv.dataPago;
                this.dataArmada = data;
                console.log(this.dataArmada);
              }

  ngOnInit() {

    window['culqi'] = this.culqi.bind(this);

    this.desactivadoBoton = true;
    this.desactivadoBotonLocal = true;
    /*  this.culqiData = JSON.parse(localStorage.getItem('culqiData')); */
    /* console.log('culqi guardada en local', localStorage.getItem('culqiData')); */

    this.pago = 'enLocal';

    this.doctor = this.dataArmada.doctor;
    this.available = this.dataArmada.available;
    this.hora = this.dataArmada.hora;
    this.depe = this.dataArmada.depe;
    this.prestacion = this.hora.params.provisionId[0];
    console.log('this.hora:', this.hora);
    console.log('this.depe:', this.depe);
    /* this.depe = this.navParams.get('depe'); */
    this.price = this.dataArmada.price;
    console.log('this.price:', this.price);
    /* this.prestacion = this.navParams.get('prestacion'); */
    console.log('this.prestacion:', this.prestacion);

    this.subida = this.hora.listjson;
    this.plan = this.dataArmada.plan;
    console.log('la hora', this.plan, this.plan);


    window['Culqi'].publicKey = 'pk_live_CyArY9ygzb0d7oZb';
   /*  window['Culqi'].publicKey = 'pk_test_e85SD7RVrWlW0u7z'; */
  }

  errorHandler(event) {
    event.target.src = "https://1.bp.blogspot.com/-p8EFlkXywyE/UDZvWTyr1bI/AAAAAAAAEU0/xL8pmKN1KOY/s1600/facebook.png"
  }


  async formPre() {
    const alert = await this.alertCtrl.create({
      header: "Creación de cita",
      message: "la cita que reservaste ha sido creada satisfactoriamente.",
      buttons: [
        {
          text: "OK",
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  payCulqi() {
    this.desactivadoBoton = false;
    console.log('this.price:', this.plan);
    if (this.currentAppointment) {
      this.payCulqiCharges = true;
      this.openCulqi();
      return
    }
    if (this.depe) {
      let id = this.depe._id;
      /* let id = this.depe.patientId; */
      let provisionId = this.hora.params.provisionId;
      console.log('provisionId ', provisionId);
      this.crudPvr.createParentDate(this.subida, id, provisionId)
        .subscribe((data: any) => {
          this.currentAppointment = data;
          this.patientId = this.currentAppointment.patientId;
          this.appointmentId = this.currentAppointment.appointmentId;
          this.checkStatusParent();
          console.log('creacion de cita para familiar', this.currentAppointment);
          this.openCulqi();
        }, err => {
          if (this.currentAppointment !== null) {
            this.openCulqi();
            return;
          }
          console.log('err', err);
          if (!err) {
            return
          }
          const code = err.error.data.errorCode;
          let alert;
          switch (code) {
            case 15006:
              // case 15035:
              alert = this.alertCtrl.create({
                header: 'Aviso al Cliente',
                message: 'Ya tienes una cita en una hora cercana a esta.',
                buttons: [
                  {
                    text: 'Buscar otra hora',
                    handler: data => {
                      this.router.navigate(['card']);
                      /* this.navCtrl.setRoot(CardPage); */
                    }
                  }
                ]
              });
              alert.present();
              break;

            case 15009:
            case 15035:
              alert = this.alertCtrl.create({
                header: 'Aviso al Cliente',
                message: 'El horario escogido ya fue tomado .',
                buttons: [
                  {
                    text: 'Buscar otra hora',
                    handler: data => {
                      this.router.navigate(['card']);
                      /*                         this.navCtrl.setRoot(CardPage); */
                    }
                  }
                ],
              });
              alert.present();
              break;

            default:
              break;
          }
        });
    } else {
      let provisionId = this.hora.params.provisionId;
      this.appointmentPrv.createAppointment(this.subida, provisionId)
        .subscribe((data: any) => {
          this.currentAppointment = data;
          this.appointmentId = this.currentAppointment.appointmentId;
          this.checkStatus();
          console.log('creando cita para paciente principal:', this.currentAppointment);
          this.openCulqi();
        }, async err => {
          if (this.currentAppointment !== null) {
            this.openCulqi();
            return;
          }
          console.log('err', err);
          if (!err) {
            return
          }
          const code = err.error.help;
          const alert = await this.alertCtrl.create({
            header: 'Error en la creación',
            subHeader: `${code}`,
            buttons: [
              {
                text: 'buscar otra',
                handler: () => {
                  this.router.navigate(['options']);
                }
              },
              {
                text: 'Salir',
                handler: () => {
                  this.router.navigate(['home']);
                }
              }
            ]
          })
          await alert.present();
        });
    }
  }

  createDateFinal() {
    let provisionId = this.hora.params.provisionId;
    this.appointmentPrv.createAppointment(this.subida, provisionId)
      .subscribe((data: any) => {
        this.currentAppointment = data;
        console.log('creando cita para paciente principal:', this.currentAppointment);
        this.openCulqi();
      }, err => {
        if (this.currentAppointment !== null) {
          return;
        }
      });
  }


  async openCulqi() {
    const loadingPago = await this.loadingCtrl.create({
      message: "Haciendo el cobro...",
    });
    await loadingPago.present();
    let appointment = this.currentAppointment;

    if (this.currentAppointment) {
      console.log('this.plan', this.plan);
      const settings = {
        title: this.plan.plan_desc,
        description: this.plan.precio[0].prest_item_desc,
        currency: "PEN",
        amount: this.price * 100
      };

      window['Culqi'].options({
        style: {
          logo: 'https://api.aviva.pe/logo_aviva.png'
        }
      })
      window['Culqi'].settings(settings);

      console.log("open Culqi en settings:", settings);
      const metadata = {
        patientId: this.currentAppointment.patient.id,
        appointmentId: this.currentAppointment.appointmentId,
        planId: this.plan.plan_pk,
        precioSinIGV: this.plan.precio[0].prest_precio_val,
        precioConIGV: this.plan.precio[0].total
      }
      console.log('metadata:', metadata);
      window['Culqi'].open();
      this.i = setInterval(() => {
        const culqiObj = window['Culqi'];
        console.log('culqiObj:', culqiObj);
        if (culqiObj['closeEvent'] != null) {
          console.log('Formulario culqi cerrado', culqiObj['closeEvent']);
          clearInterval(this.i);
          clearInterval(this.check);
          loadingPago.dismiss();
        }
        if (culqiObj['error'] != undefined) {
          console.log('Formulario culqi error', culqiObj['error']);
          /* this.deleteDate(); */
          clearInterval(this.i);
          clearInterval(this.check);
          this.loadingCtrl.dismiss();
        }
      }, 30000);
      loadingPago.dismiss();
    }
  }


  checkStatus() {
    this.check = setInterval(() => {
      this.appointmentPrv.chekstatusAppointment(this.appointmentId).subscribe(async (status: any) => {
        console.log({ status })
        if (status.status === "pendiente") {
          console.log('sigue pendiente');
        } else if (status.status === 'confirmada') {
          clearInterval(this.check);
          clearInterval(this.i);
        }
        else {
          window['Culqi'].close();
          const alert = await this.alertCtrl.create({
            header: 'Problema de Creación',
            subHeader: 'El tiempo para pago se ha agotado',
            buttons: [
              {
                text: 'intentar de nuevo',
                handler: () => {
                  this.router.navigate(['options']);
                }
              }
            ]
          });
          await alert.present();
          clearInterval(this.check);
          clearInterval(this.i);
        }
      })
    },
      30000)
  }

  checkStatusParent() {
    const userId = this.currentAppointment.patient.id;
    const appointmentId = this.currentAppointment.appointmentId;
    this.check = setInterval(() => {
      this.appointmentPrv.chekstatusAppointmentParent(userId, appointmentId).subscribe(async (status: any) => {
        console.log({ status });
        if (status.status === "pendiente") {
          console.log('sigue pendiente');
        } else {
          window['Culqi'].close();
          const alert = await this.alertCtrl.create({
            header: 'Problema de Creación',
            subHeader: 'El tiempo para pago se ha agotado',
            buttons: [
              {
                text: 'intentar de nuevo',
                handler: () => {
                  this.router.navigate(['options']);
                }
              }
            ]
          });
          await alert.present();
          clearInterval(this.check);
          clearInterval(this.i);
        }
      })

    },
      30000)
  }

  confirmCreate(appointmentId) {
    this.appointmentPrv.confirmDate(appointmentId).subscribe(confirm => {
      console.log({ confirm });
    })
  }

  confirmCreateParent(patientId, appointmentId) {
    this.appointmentPrv.confirmDateParent(patientId, appointmentId).subscribe(confirm => {
      console.log({ confirm })
    })
  }

  async culqi() {
    console.log('culqi del componente', this);
    if (window['Culqi'].token) {
      const getSettings = window['Culqi'].getSettings;
      const metadata = {
        patientId: this.currentAppointment.patient.id,
        appointmentId: this.currentAppointment.appointmentId,
        planId: this.plan.plan_pk,
        precioSinIGV: this.plan.precio[0].prest_precio_val,
        precioConIGV: this.plan.precio[0].total
      }
      const data = {
        amount: getSettings.amount,
        currency_code: getSettings.currency,
        email: window['Culqi'].token.email,
        source_id: window['Culqi'].token.id,
        metadata
      }
      console.log('data:', data);
      const loading = await this.loadingCtrl.create({
        message: 'pagando cita'
      });
      await loading.present();
      this.payCulqiCharges = true;
      const self = this;
      this.culqiSrv.charges(data).subscribe((vuelta: any) => {
        this.vuelta = vuelta
        console.log('data', vuelta);
        loading.dismiss();
        clearInterval(this.check);
        this.payCulqiCharges = true;
        if (vuelta.message === "ok") {
          this.router.navigate(['home']);
          this.formPre();
        } else {
          return
        }
      }, async err => {
        if (this.prestacion === 44) {
          console.log('error:', err);
          this.loadingCtrl.dismiss();
          const alertError = await this.alertCtrl.create({
            header: 'error en tarjeta',
            message: 'problema en el cargo en su tarjeta',
            buttons: [
              {
                text: 'cerrar',
                handler: () => {
                  this.payCulqiCharges = true;
                  this.desactivadoBoton = true;
                  this.router.navigate(['options']);
                }
              },
              {
                text: 'Pagar en clínica',
                handler: () => {
                  this.router.navigate(['home']);
                  clearInterval(this.check);
                }
              }

            ],
          });
          await alertError.present();
        } else {
          console.log('error:', err);
          this.loadingCtrl.dismiss();
          const alertError = await this.alertCtrl.create({
            header: 'error en tarjeta',
            message: 'problema en el cargo en su tarjeta',
            buttons: [
              {
                text: 'cerrar',
                handler: () => {
                  this.payCulqiCharges = true;
                  this.desactivadoBoton = true;
                  this.router.navigate(['options']);
                }
              },
              {
                text: 'intentar de nuevo',
                handler: async () => {
                  this.openCulqi()
                }
              }
            ],
          });
        }
      });
    } else {
      console.log('token error', window['Culqi'].error);

    }
  }

  async payClinic() {
    let alert = await this.alertCtrl.create({
      header: 'error al hacer cargo',
      message: 'hubo un error alhacer cargo con la tarjeta',
      buttons: [
        {
          text: 'reintentar',
          handler: () => {
            this.desactivadoBoton = true;
          }
        },
        {
          text: 'Pagar en Clínica',
          handler: async () => {
            let alert = await this.alertCtrl.create({
              header: "Pago en Clínica",
              message: 'Tu pago no pudo ser realizado pero no te preocupes paga en la clínica tu cita fue reservada ...',
              buttons: [
                {
                  text: 'ok'
                }
              ]
            });
            await alert.present();
            this.router.navigate(['tabs']);
            /*         this.navCtrl.setRoot(MyDatesPage); */
          }
        }
      ]
    });
    alert.present();
  }


  next() {
    let provisionId = this.prestacion;
    this.desactivadoBotonLocal = false;
    this.appointmentPrv.createAppointment(this.subida, provisionId).subscribe(async (data: any) => {
      console.log('data devuelta:', data);
      let appointmentId = data.appointmentId;
      this.confirmCreate(appointmentId);
      if (data.ok == false) {
        this.problemReserva(data);
      } else {
        const loading = await this.loadingCtrl.create({
          message: "creando cita"
        });
        await loading.present();
        this.createCita();
        loading.dismiss();

        this.router.navigate(['tabs']);
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
                this.router.navigate(['tabs']);
              }
            },
            {
              text: 'Pagar en clínica',
              handler: () => {
                this.router.navigate(['/']);
                clearInterval(this.check);
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
                clearInterval(this.check);
              }
            }

          ]
        })
        await alert.present();
        console.log('err', err);
      }
    });
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


  nextDepe() {
    this.desactivadoBotonLocal = false;
    let id = this.depe._id;
    let provisionId = this.hora.params.provisionId;
    console.log('el id que va para creacion de familiar:', id)
    this.crudPvr.createParentDate(this.subida, id, provisionId).subscribe(async data => {
      const appointmentId = data.appointmentId;
      const patientId = data.patient.id;
      const loading = await this.loadingCtrl.create({
        message: "creando cita"
      });
      await loading.present();
      this.createCita();
      this.router.navigate(['tabs']);
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
              this.router.navigate(['tabs'])
            }
          },
          {
            text: 'buscar nueva',
            handler: () => {
              this.router.navigate(['dates'])
            }
          }
        ]
      })
      await alert.present();
      console.log('err', err);

    });
  }

  async waitingCreate() {
    const loading = await this.loadingCtrl.create({
      message: "creando cita"
    });
    await loading.present();
  }

  async createDate() {
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

  retry(){
    console.log('retry');
  }
}
