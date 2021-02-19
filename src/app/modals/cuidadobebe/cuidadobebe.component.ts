import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-cuidadobebe',
  templateUrl: './cuidadobebe.component.html',
  styleUrls: ['./cuidadobebe.component.scss'],
})
export class CuidadobebeComponent implements OnInit {
  public nota;
  constructor(public notaSrv: NotasService) { }

  ngOnInit() {
    this.nota = this.notaSrv.dataNota;
    console.log(this.nota);
  }

}
