import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-estimulacion',
  templateUrl: './estimulacion.component.html',
  styleUrls: ['./estimulacion.component.scss'],
})
export class EstimulacionComponent implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {}

  back(){
    this.nav.back();
  }
}
