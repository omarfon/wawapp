import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-hitos',
  templateUrl: './hitos.component.html',
  styleUrls: ['./hitos.component.scss'],
})
export class HitosOneComponent implements OnInit {
  public nota;
  constructor(public notaSrv: NotasService) { }

  ngOnInit() {
    this.nota = this.notaSrv.dataNota;
    /* console.log(this.nota); */
  }

}
