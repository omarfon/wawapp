import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styleUrls: ['./vacuna.component.scss'],
})
export class VacunaComponent implements OnInit {
  public nota;
  constructor(public notasSrv: NotasService) { }

  ngOnInit() {
    this.nota = this.notasSrv.dataNota;
   /*  console.log(this.nota); */
  }

  

}
