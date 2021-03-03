import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DependentsService } from 'src/app/services/dependents.service';
import { ParematersService } from 'src/app/services/parematers.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
})
export class GraficasComponent implements OnInit {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['mes 1', 'mes 2', 'mes 3', 'mes 4', 'mes 5', 'mes 6', 'mes 7', 'mes 8', 'mes 9', 'mes 10', 'mes 11'];
  public lineChartType:string = 'line';
  public barChartLegend:boolean = true;

  public barChartDataPeso:any[] = [
    {data: [57, 59, 63, 66, 69, 74, 85], label: 'Escala'},
    {data: [57, 58, 61, 63, 63, 64, 65], label: 'Peso'}
  ];

  public barChartDataTalla:any[] = [
    {data: [32, 34, 35, 37, 39, 40, 42], label: 'Talla'}
  ];

  public barChartDataPc:any[] = [
    {data: [23, 24, 26, 29, 30, 31, 32], label: 'Perimetro cefalico'}
  ];

  public barChartColorsPeso
   = [
    { // peso
      backgroundColor: 'rgba(255,162,140,0.5)',
      borderColor: '#FFA28C',
      pointBackgroundColor: '#E87257',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.3)'
    }
  ];

  public barChartColorsTalla
  = [
   { // talla
     backgroundColor: 'rgba(148,131,200,0.4)',
     borderColor: '#9483C8',
     pointBackgroundColor: '#7A55EB',
     pointBorderColor: '#fff',
     pointHoverBackgroundColor: '#fff',
     pointHoverBorderColor: 'rgba(77,83,96,1)'
   }
 ];

 public barChartColorsPc
 = [
  { // perimetro cefalico
    backgroundColor: 'rgba(250,225,139,0.8)',
    borderColor: '#FFC839',
    pointBackgroundColor: '#FFC839',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }
];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }
  
  public id = 1803 ;
  private _controls;
  private controls;
  dependends;
  userId;
  _items;
  control;
  parametros;
  _parametros;
  constructor(public nav: NavController,
              public router: Router,
              public dependendentSrv: DependentsService,
              public parametersSrv: ParematersService) {
                this.parametersSrv.getAllParametersPerId(this.id).subscribe(data =>{
                  this._parametros = data;
                  this.parametros = this._parametros[0].parametros;
                  const parametros = this.parametros.sort((a, b) => {
                    if ((a.fecha_registro + a.hora_registro) > (b.fecha_registro + b.hora_registro)) {
                      return 1;
                    } else if ((a.fecha_registro + a.hora_registro) < (b.fecha_registro + b.hora_registro)) {
                      return -1
                    } else {
                      return 0;
                    }
                  });
                  const pesos = parametros.filter(item => item.descripcion == 'Peso').map(item => item.valor);
                  const tallas = parametros.filter(item => item.descripcion == 'Talla').map(item => item.valor);
                  const perimetros = parametros.filter(item => item.descripcion == 'Perímetro cefálico').map(item => item.valor);
                  this.barChartDataPeso = [
                    {data: [8.7, 9.7, 10.7, 11.2, 12, 13.1, 15, 16, 17.1, 18, 19], label: 'Escala'},
                    {data: [...pesos], label: 'Peso'}
                  ]
            
                  this.barChartDataTalla = [
                    {data: [71, 73, 75, 77, 78, 80, 83, 85, 87, 89, 90, 91, 93], label: 'Escala'},
                    {data: [...tallas], label: 'Talla'}
                  ]
            
                  this.barChartDataPc = [
                    {data: [...perimetros], label: 'Perimetro cefalico'}
                  ]
            
                  console.log('this.parametros:', this.parametros, parametros,{pesos, tallas, perimetros});
                })
               }

  ngOnInit() {

    
  }

  back(){
    this.nav.back();
  }
}
