import { Component, OnInit } from '@angular/core';
import { DependentsService } from '../services/dependents.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DatesComponent } from '../pages/dates/dates.component';
import { UserService } from '../services/user.service';
import { LoadingController } from '@ionic/angular';
import { ControlsService } from '../services/controls.service';
import { AppoinmentService } from '../services/appoinment.service';

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
  constructor(public dependentsSrv: DependentsService,
              public userSrv: UserService,
              public loading: LoadingController,
              public constrolSrv: ControlsService,
              public appoinmentSrv: AppoinmentService,
              public router: Router) {}


async ngOnInit(){
    const loading = await this.loading.create({
      message: 'cargando información...'
    })
    await loading.present()
    this.dependentsSrv.getDependens().subscribe((dependientes:any) =>{
      this.dependends = dependientes.map(dependend =>{
        dependend.edad = moment().diff(dependend.birthdate, 'years');
        loading.dismiss();
        return dependend
      });
      console.log('lista de dependientes:', this.dependends);
      this.id = 1083;
      this.fechaInicio = this.dependends.birthdate;
      this.constrolSrv.getAllControlPerContact(this.id).subscribe((data:any) => {
        this._items = data
        console.log('los encuentros del paciente:', this._items);
        this.control = this._items[0].encuentros;
        console.log('this.control:', this.control);
  
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
        this.appoinmentSrv.getAppoinmentsPerUserControl(this.id).subscribe(data => {
          this._dates = data;
          this.dates = this._dates[0].appointments[0];
          console.log('this.dates:', this.dates);
        });
    });
}

// this method change te ParentId for recharge the controls
getDataParent(dependend) {
  console.log('dependend:', dependend);
  this._id = dependend.patientId;
  this.id = this._id;
  console.log('this.id', this.id);
  this.constrolSrv.getAllControlPerContact(this.id).subscribe((data: any) => {
    this._items = data
    this._control = this._items[0].encuentros;
    this.control = this._control;
    console.log('los encuentros del paciente:', this._items, this.control);
  });
}

getDates(){
  this.userSrv.userId = this.userId;
  this.router.navigate(['dates'])
}

}