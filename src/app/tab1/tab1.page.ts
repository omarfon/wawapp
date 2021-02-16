import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DependentsService } from '../services/dependents.service';
import { NotasService } from '../services/notas.service';
import * as moment from 'moment';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public notas;
  public dependends;
  public filtrados;
  public slideOpts = {
    slidesPerView: 5,
    virtualTranslate: false,
    spaceBetween: 20,
    slidesPerGroup: 3,
  }
  public slidOptions = {
    slidesPerView: 1.1,
    virtualTranslate: false,
  }
  public meses = [
    {
      mes:1,
      de:0,
      a: 4
    },
    {
      mes:2,
      de:4,
      a: 8
    },
    {
      mes:3,
      de:8,
      a: 12
    },
    {
      mes:4,
      de:12,
      a: 16
    },
    {
      mes:5,
      de:16,
      a: 20
    },
    {
      mes:6,
      de:20,
      a: 24
    },
    {
      mes:7,
      de:24,
      a: 28
    },
    {
      mes:8,
      de:24,
      a: 28
    },
    {
      mes:9,
      de:24,
      a: 28
    },
    {
      mes:10,
      de:24,
      a: 28
    },
    {
      mes:11,
      de:24,
      a: 28
    },
    {
      mes:12,
      de:24,
      a: 28
    },
    {
      mes:15,
      de:24,
      a: 28
    },
    {
      mes:18,
      de:24,
      a: 28
    },
    {
      mes:24,
      de:24,
      a: 28
    },
    {
      mes:48,
      de:24,
      a: 28
    },
  ]
  constructor(public router:Router,
              public notasSrv: NotasService,
              public dependentSrv: DependentsService,
              public loadingCtrl: LoadingController) {}

 ngOnInit(){
  this.getNotes();
  let role = localStorage.getItem('role');
    if (role == 'user') {
      this.getDependents()
    } else {
      console.log('no es usuario no carga los dependientes');
    }
}

async getNotes(){
  const loading = await this.loadingCtrl.create({
    message: 'Cargando categorías...'
  });
  await loading.present();
  this.notasSrv.getAllNotes().subscribe(data => {
    this.notas = data;
    console.log(this.notas);
    loading.dismiss();
  })
}

getDependents() {
  this.dependentSrv.getDependens().subscribe((dependientes: any) => {
    this.dependends = dependientes.map(dependend => {
      dependend.edad = moment().diff(dependend.birthdate, 'years');
      // console.log('dependend:', dependend);
      return dependend;
    });
    // console.log('los dependientes:', this.dependends);
    const listaMenores = this.dependends.filter(d => d.edad <= 5);
   this.filtrados = listaMenores;
    console.log('this.listaMenores:', this.filtrados);
  });
}

async renderizarInfoPorHijo(dep) {
  const loading = await this.loadingCtrl.create({
    message: 'Cargando información...'
  });
  await loading.present();
  const meses = dep.birthdate;
  const diaActual = moment();
  // console.log(diaActual);
  const mesesActual = diaActual.diff(meses, 'months')
  console.log('mesesActual:', mesesActual);
  this.notasSrv.getAllNotes().subscribe(data => {
    this.notas = data
    const newNotas = this.notas.filter(n => n.mes <= mesesActual);
    this.notas = newNotas;
    console.log('todas las notas:', this.notas);
    loading.dismiss();
  });
}

onChangeDependent(dep: any): void {
  this.getDependents()
  console.log('el dependiente que me trae', dep);
}

goToHitos(){
  this.router.navigate(['hitos']);
}
goToEstimulation(){
  this.router.navigate(['estimulacion'])
}
mesSelect(m){
  console.log(m);
}
}
