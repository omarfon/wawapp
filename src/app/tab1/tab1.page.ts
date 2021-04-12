import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlide, IonSlides, LoadingController, ModalController } from '@ionic/angular';
import { DependentsService } from '../services/dependents.service';
import { NotasService } from '../services/notas.service';
import * as moment from 'moment'
import { CuidadobebeComponent } from '../modals/cuidadobebe/cuidadobebe.component';
import { NutricionComponent } from '../modals/nutricion/nutricion.component';
import { BebefamiliaComponent } from '../modals/bebefamilia/bebefamilia.component';
import { CreateParentComponent } from '../modals/create-parent/create-parent.component';
import { HitosOneComponent } from '../modals/hitos/hitos.component';
import { EstimulacionComponent } from '../pages/estimulacion/estimulacion.component';
import { VacunaComponent } from '../modals/vacuna/vacuna.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public currentIndex;
  @ViewChild('slideWithNav') slides: IonSlides;
  @ViewChild('status') slide: IonSlide;
  public notas;
  public hitos;
  public dependends;
  public filtrados;
  public dep:boolean = false;
  public activo: boolean = false;
  public slideOpts = {
    slidesPerView: 5.2,
    virtualTranslate: false,
    spaceBetween: 0, 
    initialSlide:0
  }
  public slidOptions = {
    slidesPerView: 1.4,
    virtualTranslate: false,
  }
  public meses = [
    {mes:0,de:0,a: 4},
    {mes:1,de:0,a: 4},
    {mes:2,de:4,a: 8},
    {mes:3,de:8,a: 12},
    {mes:4,de:12,a: 16},
    {mes:5,de:16,a: 20},
    {mes:6,de:20,a: 24},
    {mes:7,de:24,a: 28},
    {mes:8,de:24,a: 28},
    {mes:9,de:24,a: 28},
    {mes:10,de:24,a: 28},
    {mes:11,de:24,a: 28},
    {mes:12,de:24,a: 28},
    {mes:13,de:24,a: 28},
    {mes:14,de:24,a: 28},
    {mes:15,de:24,a: 28},
    {mes:16,de:24,a: 28},
    {mes:17,de:24,a: 28},
    {mes:18,de:24,a: 28},
    {mes:24,de:24,a: 28},
    {mes:36,de:36,a: 40},
    {mes:48,de:40,a: 48},
  ]
  public mesActual;
  constructor(public router:Router,
              public notasSrv: NotasService,
              public dependentSrv: DependentsService,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController) {
               
              }

 ngOnInit(){
  this.getDependents()
  
 /* this.getNotes(); */
 let role = localStorage.getItem('role');
   if (role == 'user') {
   } else {
     /* console.log('no es usuario no carga los dependientes'); */
   }
}

async getNotes(){
  const loading = await this.loadingCtrl.create({
    message: 'Cargando categorías...'
  });
  await loading.present();
  this.notasSrv.getAllNotes().subscribe(data => {
    this.notas = data;
    /* console.log(this.notas); */
    const filtradasOne = 
    this.notas.filter(x => x.type === 'bebecuidadoysalud' || x.type === 'bebenutricion' || x.type === 'bebefamilia' || x.type === 'bebevacunas' || x.type === 'bebehitos' || x.type === 'bebecuidado');
    this.notas = filtradasOne;
 /*    console.log(this.notas); */
    loading.dismiss();
  })
}

async getDependents() {
  const loading = await this.loadingCtrl.create({
    message: 'Cargando categorías...'
  });
  await loading.present();
  this.dependentSrv.getDependens().subscribe((dependientes: any) => {
    this.dependends = dependientes.map(dependend => {
      dependend.edad = moment().diff(dependend.birthdate, 'months');
      console.log('dependend:', dependend);
      return dependend;
    },err =>{
      loading.dismiss();
      this.slideOpts.initialSlide = 1;
      const mes = {mes:1,de:0,a: 4};
      this.mesSelect(mes);
    });
    // console.log('los dependientes:', this.dependends);
      const listaMenores = this.dependends.filter(d => d.edad <= 24);
      this.filtrados = listaMenores;
      if(this.filtrados){
      const diaActual = moment();
      const mes = this.filtrados[0].edad;
      const nombre = this.filtrados[0].name;
      const meses = this.filtrados[0].birthdate;
    // console.log(diaActual);
      const mesesActual = diaActual.diff(meses, 'months');
      this.mesActual = mesesActual;
      this.slideOpts.initialSlide = mes;
      
      
      console.log('mes primer menor:', mesesActual); 
      this.notasSrv.getNotesPerMonth(this.mesActual).subscribe(data => {
        this.notas = data
     /*    console.log(this.notas); */
        const newNotas = this.notas.filter(n => n.mes <= mesesActual);
        this.notas = newNotas;
        const filtradasOne = this.notas 
        this.notas.filter(x => x.type === 'bebecuidadoysalud' || x.type === 'bebenutricion' || x.type === 'bebefamilia' || x.type === 'bebevacunas' || x.type === 'bebehitos' || x.type === 'bebecuidado' || x.type === 'estimulacion'); 
        this.notas = filtradasOne; 
        loading.dismiss();
      });
   }
  },err => {
    loading.dismiss();
    this.slideOpts.initialSlide = 1;
    const mes = {mes:1,de:0,a: 4};
    this.mesSelect(mes);
  });
}


getAllNotes(){
  this.notasSrv.getAllNotes().subscribe(data => {
    this.notas = data
  })
}

async renderizarInfoPorHijo(dep, index) {
  this.dep = true;
  console.log(this.dep, index);
  const loading = await this.loadingCtrl.create({
    message: 'Cargando información...'
  });
  await loading.present();
  const meses = dep.birthdate;
  const diaActual = moment();
  const mes = dep.edad;
  const nombre = dep.name;
  // console.log(diaActual);
  const mesesActual = diaActual.diff(meses, 'months');
  this.mesActual = mesesActual;
  this.slideOpts.initialSlide = mesesActual;
  this.currentIndex = mesesActual;
  /* console.log('mesesActual:', mesesActual); */
  this.notasSrv.getNotesPerMonth(mesesActual).subscribe(data => {
    this.notas = data
    const newNotas = this.notas.filter(n => n.mes <= mesesActual);
    this.notas = newNotas;
    const filtradasOne 
    = this.notas.filter(x => x.type === 'bebecuidadoysalud' || x.type === 'bebenutricion' || x.type === 'bebefamilia' || x.type === 'bebevacunas' || x.type === 'bebehitos' || x.type === 'bebecuidado');
    this.notas = filtradasOne;
    /* console.log(this.notas);
    console.log('todas las notas:', this.notas);
    console.log('this.htos', this.hitos); */
    loading.dismiss();
  });
}

onChangeDependent(dep: any): void {
  this.getDependents()
  /* console.log('el dependiente que me trae', dep); */
}

goToHitos(){
  this.router.navigate(['hitos']);
}
goToEstimulation(){
  this.router.navigate(['estimulacion'])
}

async mesSelect(m){
  this.currentIndex = m.mes;
  this.mesActual = m.mes;
  const loading = await this.loadingCtrl.create({
    message: 'Cargando información...'
  });
  await loading.present();
  /* console.log(m, m.mes); */
  this.notasSrv.getNotesPerMonth(m.mes).subscribe(data => {
    this.notas = data
    const newNotas = this.notas.filter(n => n.mes <= m.mes);
     this.notas = newNotas;
     localStorage.setItem('notas', this.notas)
     console.log(this.notas);
    const filtradasOne = this.notas.filter(x => x.type === 'bebecuidadoysalud' || x.type === 'bebenutricion' || x.type === 'bebefamilia' || x.type === 'bebevacunas' || x.type === 'bebehitos');
    this.notas = filtradasOne; 
/*   
    console.log('todas las notas:', this.notas);
    console.log('this.htos', this.hitos); */
    loading.dismiss();
  });

}

change(e){
  this.slides.getActiveIndex().then(
    (index) => {
      this.currentIndex = index ;
      /* console.log(this.currentIndex); */
    }
  )
}

async openModalbebeCuidadoySalud(nota){
  this.notasSrv.dataNota = nota;
  const modal = await this.modalCtrl.create({
    component: CuidadobebeComponent,
    cssClass: 'modalBebeCuidadoSalud',
    showBackdrop:true
  });
  await modal.present();
}

async openModalnutricion(nota){
  this.notasSrv.dataNota = nota;
  const modal = await this.modalCtrl.create({
    component: NutricionComponent,
    cssClass: 'modalBebeCuidadoSalud',
    showBackdrop: true
  })
  await modal.present();
}

async openBebeyFamilia(nota){
  this.notasSrv.dataNota = nota;
  const modal = await this.modalCtrl.create({
    component: BebefamiliaComponent,
    cssClass: 'modalBebeCuidadoSalud',
    showBackdrop: true
  })
  await modal.present();
}

async openModalHitos(nota){
  this.notasSrv.dataNota = nota;
  const modal = await this.modalCtrl.create({
    component: HitosOneComponent,
    cssClass: 'modalBebeCuidadoSalud',
    showBackdrop:true
  })
  await modal.present();
}

async openModalEstimulacion(nota){
  this.notasSrv.dataNota = nota;
  const modal = await this.modalCtrl.create({
    component: EstimulacionComponent,
    cssClass: 'modalBebeCuidadoSalud',
    showBackdrop:true
  })
  await modal.present();
}

async openModalVacuna(nota){
  this.notasSrv.dataNota = nota;
  const modal = await this.modalCtrl.create({
    component: VacunaComponent,
    cssClass: 'modalBebeCuidadoSalud',
    showBackdrop:true
  })
  await modal.present();
}

openHitos(){
  this.router.navigate(['hitos']);
  /* console.log('abriendo hitos, guardar la fecha de y el sujeto para mandar los datos'); */
}

async addParent(){
  console.log('abrir Modal');
  const modal = await this.modalCtrl.create({
    component: CreateParentComponent,
    cssClass: 'modalCreateParent',
    showBackdrop: true
  });

  modal.onDidDismiss().then((data)=>{
    if(data){
      this.getDependents();
    }else{
      return
    }
  })
  await modal.present();

}

}
