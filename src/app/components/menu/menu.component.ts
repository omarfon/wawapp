import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public router:Router,
              public menu: MenuController) { }

  ngOnInit() {}

  goToHome(){
    this.router.navigate(['home']);
    this.menu.close();
  }

  goToMydates(){
    this.router.navigate(['my-dates']);
    this.menu.close();
  }

  goToRecipes(){
    this.router.navigate(['recipes']);
    this.menu.close();
  }

  goToMyparents(){
    this.router.navigate(['myparents']);
    this.menu.close();
  }

  goToReserve(){
    this.router.navigate(['options']);
    this.menu.close();
  }

  closeSesion(){
    localStorage.clear();
    this.router.navigate(['login']);
    this.menu.close();
  }

  goToTele(){
    this.router.navigate(['telecon']);
    this.menu.close();
  }

  goToGraficas(){
    this.router.navigate(['graficas']);
    this.menu.close();
  }
}
