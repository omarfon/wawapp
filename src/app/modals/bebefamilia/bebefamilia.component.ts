import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-bebefamilia',
  templateUrl: './bebefamilia.component.html',
  styleUrls: ['./bebefamilia.component.scss'],
})
export class BebefamiliaComponent implements OnInit {
  public nota;
  constructor(public notasSrv: NotasService) { }

  ngOnInit() {
    this.nota = this.notasSrv.dataNota;
    console.log(this.nota);
  }


}
