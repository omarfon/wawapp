import { Component, OnInit } from '@angular/core';
import { DependentsService } from '../services/dependents.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DatesComponent } from '../pages/dates/dates.component';
import { UserService } from '../services/user.service';

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
  constructor(public dependentsSrv: DependentsService,
              public userSrv: UserService,
              public router: Router) {}


ngOnInit(){
    this.dependentsSrv.getDependens().subscribe((dependientes:any) =>{
      this.dependends = dependientes.map(dependend =>{
        dependend.edad = moment().diff(dependend.birthdate, 'years');
        return dependend
      });
      console.log('lista de dependientes:', this.dependends);
    })
}

getDates(){
  this.userSrv.userId = this.userId;
  this.router.navigate(['dates'])
}

}