import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DependentsService } from 'src/app/services/dependents.service';
import { VaccinesService } from 'src/app/services/vaccines.service';
import * as moment from 'moment';

@Component({
  selector: 'app-grilla-vacuna',
  templateUrl: './grilla-vacuna.component.html',
  styleUrls: ['./grilla-vacuna.component.scss'],
})
export class GrillaVacunaComponent implements OnInit {

  public vacunas;
  public vacunasKeys: any;
  public dependens;
  constructor(public vacinneSrv: VaccinesService,
              public dependentsSrv: DependentsService,
              public router: Router) { }

  ngOnInit() {
    this.dependentsSrv.getDependens().subscribe((dependientes:any) =>{
      this.dependens = dependientes.map(dependend =>{
          dependend.edad = moment().diff(dependend.birthdate, 'years');
          console.log('dependend:', dependend);
          return dependend;
        });
      let id = this.dependens[0].patientId;
      this.vacinneSrv.getAllVaccinesPerUser(id).subscribe(data => {
        this.vacunas = data;
        this.vacunasKeys = [0, 60, 120, 180, 210, 240, 360, 450, 540, 1440];
        // this.vacunaKeys = Object.keys(data);
        // console.log('las vacunas:', this.vacunaKeys);
        console.log('vacunas', this.vacunas);
      });
    });
  }


  goToDetailVacuna(vacuna){
    // console.log('los datos del vac:', key, v);
    this.router.navigate(['detail',{
      vacuna:vacuna, 
      vacunas: this.vacunas
    }]);
  }
}
