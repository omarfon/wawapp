import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-hitos',
  templateUrl: './hitos.component.html',
  styleUrls: ['./hitos.component.scss'],
})
export class HitosComponent implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {}

  back(){
    this.nav.back();
  }
}
