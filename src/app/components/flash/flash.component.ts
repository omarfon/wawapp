import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
})
export class FlashComponent implements OnInit {
  flipped: boolean = false;
  constructor() { }

  ngOnInit() {}

  flip(){
    this.flipped = !this.flipped;
    console.log('moviendo flip');
  }


}
