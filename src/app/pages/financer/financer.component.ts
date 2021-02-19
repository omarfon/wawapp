import { Component, OnInit } from '@angular/core';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-financer',
  templateUrl: './financer.component.html',
  styleUrls: ['./financer.component.scss'],
})
export class FinancerComponent implements OnInit {
  public dataCita;
  constructor(public citasSrv: CitasService) { }

  ngOnInit() {
    this.dataCita = this.citasSrv.dataDate;
    console.log(this.dataCita);
  }


}
