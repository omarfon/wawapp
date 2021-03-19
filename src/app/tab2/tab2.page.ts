import { Component, OnInit } from '@angular/core';
import { DependentsService } from '../services/dependents.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DatesComponent } from '../pages/dates/dates.component';
import { UserService } from '../services/user.service';
import { LoadingController } from '@ionic/angular';
import { ControlsService } from '../services/controls.service';
import { AppoinmentService } from '../services/appoinment.service';
import { ParametersComponent } from '../pages/parameters/parameters.component';
import { FinancerService } from '../services/financer.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
public dependends : any;
public dates;
public AllControls;
public userId;
public id;
public _id;
public fechaInicio;
public _items;
public control;
public _control;
public _dates;
public dependend;
public $dependend;
public filtrados;
public title: boolean = false;
  constructor(public dependentsSrv: DependentsService,
              public userSrv: UserService,
              public loading: LoadingController,
              public constrolSrv: ControlsService,
              public appoinmentSrv: AppoinmentService,
              public financerSrv: FinancerService,
              public router: Router) {}


async ngOnInit(){
    const loading = await this.loading.create({
      message: 'cargando información...'
    })
    await loading.present();
    this.dependentsSrv.getDependens().subscribe((dependientes:any) =>{
      this.dependends = dependientes.map(dependend =>{
        dependend.edad = moment().diff(dependend.birthdate, 'years');
        loading.dismiss();
        return dependend
      });
      if(this.dependends){
        this.filtrados = this.dependends.filter(x => x.edad < 5)
        this.id = this.filtrados[0].patientId;
      }
      /* console.log('lista de dependientes:', this.dependends, this.filtrados); */
      this.fechaInicio = this.dependends.birthdate;
      this.constrolSrv.getAllControlPerContact(this.id).subscribe((data:any) => {
        this._items = data
       /*  console.log('los encuentros del paciente:', this._items); */
        this.control = this._items[0].encuentros;
        /* console.log('this.control:', this.control); */
  
        const ordenados = this.control.sort((a, b) => {
          if ((a.fecha) > (b.fecha_registro)) {
            return 1;
          } else if ((a.fecha) < (b.fecha)) {
            return -1
          } else {
            return 0;
          }
        });
        console.log('ordenados:', ordenados );
        });
        if(!this.control){
          this.title = true;
        }
        this.appoinmentSrv.getAppoinmentsPerUserControl(this.id).subscribe(data => {
          this._dates = data;
          /* console.log(this._dates); */
       /*    this.dates = this._dates[0].appointments[0]; */
          /* console.log('this.dates:', this._dates); */
        });
    });
}

// this method change te ParentId for recharge the controls
async getDataParent(dependend) {
  const loading = await this.loading.create({
    message: 'cargando controles...'
  });
  await loading.present();
  /* console.log('dependend:', dependend); */
  this.dependend = dependend;
  this._id = this.dependend.patientId;
  this.id = this._id;
  /* console.log('this.id', this.id); */
  const controles = this.constrolSrv.getAllControlPerContact(this.id).subscribe((data: any) => {
    this._items = data
    this._control = this._items[0].encuentros;
    const ordenados = this._control.sort((a, b) => {
          if ((a.fecha) > (b.fecha_registro)) {
            return 1;
          } else if ((a.fecha) < (b.fecha)) {
            return -1
          } else {
            return 0;
          }
        });
        console.log('ordenados:', ordenados );
    this.control = ordenados;
    if(!this.control){
      this.title = true;
    }
    console.log('los encuentros del paciente:', this._items, this.control);
  }, err => {
    /* console.log(err); */
  });
  loading.dismiss();
  
}

getDates(){
  this.userSrv.userId = this._id;
  this.router.navigate(['dates'])
}

goToParameters(c){
  console.log(c);
  this.userSrv.userId = this.id;
  this.userSrv.content = c;
  this.router.navigate(['parametros']);
  }

goToRecipes(c){
  console.log(c);
  this.financerSrv.dataDoctorFInancer = c;
  this.financerSrv.patientId = this.id;
  this.router.navigate(['detail-recipe']);
  }

}