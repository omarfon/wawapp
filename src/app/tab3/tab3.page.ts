import { Component, OnInit } from '@angular/core';
import { DependentsService } from '../services/dependents.service';
import { VaccinesService } from '../services/vaccines.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public vacunas;
  public vacunasKeys: any;
  public dependens;
  constructor(public dependentsSrv: DependentsService,
              public vacinneSrv: VaccinesService,
              public loadingCtrl: LoadingController,
              public router: Router) {}

    async ngOnInit(){
        const loading = await this.loadingCtrl.create({
          message: 'Cargando información...'
        });
        await loading.present();
      this.dependentsSrv.getDependens().subscribe((dependientes:any) =>{
        this.dependens = dependientes.map(dependend =>{
            dependend.edad = moment().diff(dependend.birthdate, 'years');
            console.log('dependend:', dependend);
            return dependend;
          });
        let id = this.dependens[0].patientId;
    /*     this.vacinneSrv.getAllVaccines().subscribe(data => {
          this.vacunas = data; */
          this.vacinneSrv.getAllVaccinesPerUser(1803).subscribe(data => {
            this.vacunas = data;
          this.vacunasKeys = [0, 60, 120, 180, 210, 240, 360, 450, 540, 1440];
          console.log('vacunas', this.vacunas);
          loading.dismiss();
        });
      });
      this.getAllVaccinePerUser();
    }

    getAllVacine(){
      this.vacinneSrv.getAllVaccines().subscribe(data => {
        console.log('todas las vacunas',data);
      })
    }
  
    getAllVaccinePerUser(){
      this.vacinneSrv.getAllVaccinesPerUser(1803).subscribe(data =>{
        console.log('vacunas por usuario', data);
      })
    }
  
    goToDetailVacuna(vacuna){
      this.vacinneSrv.vacuna = vacuna;
      // console.log('los datos del vac:', key, v);
      this.router.navigate(['detail',{
        vacuna:vacuna, 
        vacunas: this.vacunas
      }]);
    }
}
