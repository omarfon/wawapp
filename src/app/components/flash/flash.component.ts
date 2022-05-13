import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
})
export class FlashComponent implements OnInit {
  flipped: boolean = true;
  constructor() { }

  ngOnInit() {}

  flip(){
    this.flipped = !this.flipped;
    this.flipped = true;
  }


}
