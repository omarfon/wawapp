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
  public dependends;
  public filtrados;
  public id;
  public dependend;
  public vaccine;
  constructor(public dependentsSrv: DependentsService,
              public vacinneSrv: VaccinesService,
              public loadingCtrl: LoadingController,
              public router: Router) {}

    async ngOnInit(){
  /*     this.dependentsSrv.getDependens().subscribe((dependientes:any) =>{
        this.dependends = dependientes.map(dependend =>{
          dependend.edad = moment().diff(dependend.birthdate, 'years');
          loading.dismiss();
          return dependend
        });
     */
    this.getAllDependens();
     
    
      this.getAllVaccinePerUser();
    }

    async getAllDependens(){
      const loading = await this.loadingCtrl.create({
        message: 'Cargando información...'
      });
      await loading.present(); 
      this.dependentsSrv.getDependens().subscribe((dependientes:any) =>{
        this.dependens = dependientes.map(dependend =>{
          dependend.edad = moment().diff(dependend.birthdate, 'years');
          /* console.log('dependend:', dependend); */
          return dependend;
        });
        if(this.dependens){
          this.filtrados = this.dependens.filter(x => x.edad < 5)
          this.id = this.filtrados[0].patientId;
        }
          this.vaccine = this.dependens[0].patientId;
      /*     this.vacinneSrv.getAllVaccines().subscribe(data => {
            this.vacunas = data; */
      this.getAllVaccinePerUser();
      loading.dismiss();
      });
    }

    getAllVacine(){
      this.vacinneSrv.getAllVaccines().subscribe(data => {
        /* console.log('todas las vacunas',data); */
      })
    }
  
    getAllVaccinePerUser(){
      const id = this.vaccine;
      this.vacinneSrv.getAllVaccinesPerUser(this.id).subscribe(data => {
        this.vacunas = data;
      this.vacunasKeys = [0, 60, 120, 180, 210, 240, 360, 450, 540, 720, 1440];
      /* console.log('vacunas', this.vacunas); */
      
    });
    }
  
    goToDetailVacuna(vacuna){
      this.vacinneSrv.vacuna = vacuna;
      this.vacinneSrv.month = vacuna[0].momento_dosis/ 30;
      /* console.log('los datos del vac:', vacuna) */
      this.router.navigate(['detail-vaccine']);
    }

    async getDataParent(dependend) {
      const loading = await this.loadingCtrl.create({
        message: 'cargando controles...'
      });
      await loading.present();
      /* console.log(dependend); */
      this.vaccine = dependend.patientId;
      const id = this.vaccine;
      this.vacinneSrv.getAllVaccinesPerUser(this.vaccine).subscribe(data => {
        this.vacunas = data;
      this.vacunasKeys = [0, 60, 120, 180, 210, 240, 360, 450, 540,  720, 1440];
      /* console.log('vacunas', this.vacunas); */
      loading.dismiss();
    });
    }
}
