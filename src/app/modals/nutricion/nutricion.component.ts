import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';


@Component({
  selector: 'app-nutricion',
  templateUrl: './nutricion.component.html',
  styleUrls: ['./nutricion.component.scss'],
})
export class NutricionComponent implements OnInit {
  public nota;
  constructor(public notaSrv: NotasService) { }

  ngOnInit() {
    this.nota = this.notaSrv.dataNota;
    console.log(this.nota);
  }

}
