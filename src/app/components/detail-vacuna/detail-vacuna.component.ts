import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail-vacuna',
  templateUrl: './detail-vacuna.component.html',
  styleUrls: ['./detail-vacuna.component.scss'],
})
export class DetailVacunaComponent implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {}

  back(){
    this.nav.back();
  }
}
