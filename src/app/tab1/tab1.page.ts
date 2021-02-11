import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public notas;
  constructor(public router:Router,
              public notasSrv: NotasService,
              public loadingCtrl: LoadingController) {}

async ngOnInit(){
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

goToHitos(){
  this.router.navigate(['hitos']);
}
goToEstimulation(){
  this.router.navigate(['estimulacion'])
}
}
