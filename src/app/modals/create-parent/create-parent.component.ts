import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { CrudparentService } from 'src/app/services/crudparent.service';
import { DependentsService } from 'src/app/services/dependents.service';

@Component({
  selector: 'app-create-parent',
  templateUrl: './create-parent.component.html',
  styleUrls: ['./create-parent.component.scss'],
})
export class CreateParentComponent implements OnInit {
  public formFamily: FormGroup;
  public parents;
  public _parents;
  public createParents;
  public actual;
  public doctor;
  public available;
  public hora;
  public price;
  public depe;
  public desabilitadobutton = true;
  public change;
  constructor( public router: Router,
    public fb: FormBuilder,
/*     public dependentsPvr: DependensService, */
    public crudPvr: CrudparentService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public dependentsPvr: DependentsService,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    this.actual = moment().format('YYYY-MM-DD');
    this.formFamily = this.fb.group({
      name: ['', [Validators.required]],
      paternal_surname: ['', [Validators.required]],
      maternal_surname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      type_document: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      // user_id         : [ localStorage.getItem('idTokenUser') ],
      kindred: ['', [Validators.required]]
      // email           : [ String(Math.floor(Math.random() * 9e15)) + '@ipsum.com' ],
      // password        : [ String(Math.floor(Math.random() * 9e15)) ]
    });

    console.log('la data de formulario:', this.formFamily);
  }

  closeModal() {
    this.modalCtrl.dismiss();
    console.log('modal controler dismiss');
  }

  async saveData() {
    this.desabilitadobutton = false;
    if (this.formFamily.valid) {
      let datos = this.formFamily.value;
      let data: any = {
        relation: {
          id: 4,
          name: datos.kindred
        },
        name: datos.name,
        surname1: datos.paternal_surname,
        surname2: datos.maternal_surname,
        birthdate: moment(datos.date_of_birth).format('YYYY-MM-DD'),
        gender: {
          id: 2,
          name: datos.gender
        },
        documentType: {
          id: 1,
          name: datos.type_document
        },
        documentNumber: datos.dni
      }
      this.crudPvr.createParent(data).subscribe(async data => {
        const loading = await this.loadingCtrl.create({
          message: 'Guardando datos de familiar.'
        });
        this.createParents = data;
        await loading.present();
        this.dependentsPvr.getDependens().subscribe(dat => {
          this._parents = dat;
          console.log('dependens', dat);
          this.modalCtrl.dismiss();
          loading.dismiss();
          this.dependentsPvr.dependens = this._parents;
          this.router.navigate(['tabs']);
        });
      })
    } else {
      this.errorForm();
      this.desabilitadobutton = true;
    }
  }

  async errorForm() {
    let alert = await this.alertCtrl.create({
      header: 'Error en Creación',
      message: 'talvez faltan datos en el formulario o no estan todos los campos llenos',
      buttons: [
        {
          text: 'reintentar',
          role: 'cancel'
        }, {
          text: 'salir',
          handler: () => {
            this.router.navigate(['home']);
            /* this.navCtrl.setRoot(HomePage); */
          }
        }

      ]
    });
    await alert.present();
  }


}
