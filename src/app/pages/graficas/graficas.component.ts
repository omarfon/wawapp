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
         scaleShowVerticalLines: true,
         responsive: true
  };
  public barChartLabels:string[] = ['mes 0','mes 1', 'mes 2', 'mes 3', 'mes 4', 'mes 5', 'mes 6', 'mes 7', 'mes 8', 'mes 9', 'mes 10', 'mes 11', 'mes 12', 'mes 13', 'mes 14', 'mes 15','mes 16', 'mes 17'];
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
    { // roja
      backgroundColor: 'transparent',
      borderColor: '#f14668',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.3)',
      borderDash: [4,1],
      pointBorderWidth: .4,
      /* borderDashOffset: 2, */
    },
    { // naranja
      backgroundColor: 'transparent',
      borderColor: '#f5c0c0',
      borderDash: [4,2],
      pointBorderWidth: .4,
    },
    { // amarilla
      backgroundColor: 'transparent',
      borderColor: '#fff9b0',
      borderDash: [4,2],
      pointBorderWidth: .4,
    },
    { // verde
      backgroundColor: 'transparent',
      borderColor: '#6ddccf',
      borderDash: [4,2],
      pointBorderWidth: .4,
    },
    { // azul
      backgroundColor: 'transparent',
      borderColor: '#9ab3f5',
      borderDash: [4,2],
      pointBorderWidth: .4,
    },
    { // naranja
      backgroundColor: 'rgba(15,48,87,0.5)', 
      borderColor: '#0f3057',
      borderDash: [4,2],
      pointBorderWidth: .4,
    },
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
    backgroundColor: 'rgba(250,225,139,0.5)',
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
                    {data: [2.5, 3.4, 4.4, 5.1, 5.6, 6.1, 6.4, 6.7, 7.0, 7.2, 7.7, 7.9, 7.8, 8.0, 8.2, 8.4, 8.5, 8.7], label: 'percentil 3'},
                    {data: [2.9, 3.9, 4.9, 5.6, 6.2, 6.7, 7.1, 7.4, 7.7, 7.9, 8.5, 8.7, 8.6, 8.8, 9.0, 9.2, 9.4, 9.6], label: 'percentil 15'},
                    {data: [3.3, 4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.9, 10.1, 9.6, 9.9, 10.1, 10.3, 10.5, 10.7], label: 'percentil 50'},
                    {data: [3.9, 5.1, 6.3, 7.2, 7.9, 8.4, 8.9, 9.3, 9.6, 10, 10.9, 11.2, 10.8, 11.1, 11.3, 11.6, 11.8, 12.0], label: 'percentil 85'},
                    {data: [4.3, 5.7, 7.0, 7.9, 8.6, 9.2, 9.7, 10.2, 10.5, 10.9, 11.8, 12.1, 11.8, 12.1, 12.4, 12.8, 12.9, 13.2], label: 'percentil 97'},
                    {data: [...pesos], label: 'Peso'}
                  ]
            
                  this.barChartDataTalla = [
                    {data: [46.30, 51.10, 54.70, 57.60, 60.0, 61.90, 63.60, 65.10, 66.50, 67.70, 69.00, 70.20, 71.30, 72.40, 73.40, 74.40, 75.40, 76.30], label: 'percentil 3'},
                    {data: [47.90, 52.70, 56.40, 59.30, 61.70, 63.70, 65.40, 66.90, 68.30, 69.60, 70.90, 72.10, 73.30, 74.40, 75.50, 76.50, 77.50, 78.50], label: 'percentil 15'},
                    {data: [49.90, 54.70, 58.40, 61.40, 63.90, 65.90, 67.60, 69.20, 70.60, 72.00, 73.30, 74.50, 75.70, 76.90, 78.00, 79.10, 80.20, 81.20], label: 'percentil 50'},
                    {data: [51.80, 56.70, 60.50, 63.50, 66.00, 68.10, 69.80, 71.40, 72.90, 74.30, 75.60, 77.00, 78.20, 79.40, 80.60, 81.80, 82.90, 84.00], label: 'percentil 85'},
                    {data: [53.40, 58.40, 62.20, 65.30, 67.80, 69.90, 71.60, 73.20, 74.70, 76.20, 77.60, 78.90, 80.20, 81.50, 82.70, 83.90, 85.10, 86.20], label: 'percentil 97'},
                    {data: [...tallas], label: 'Talla'}
                  ]
            
                  this.barChartDataPc = [
                    {data: [32.10, 35.10, 36.90, 38.30, 39.40, 40.30, 41.00, 41.70, 42.20, 42.60, 43.30, 43.70, 43.60, 43.90, 44.10, 44.30, 44.50, 44.70], label: 'percentil 3'},
                    {data: [33.10, 36.10, 37.9, 39.30, 40.40, 41.30, 42.10, 42.70, 43.20, 43.70, 44.60, 44.90, 44.70, 45.00, 45.20, 45.50, 45.60, 45.80], label: 'percentil 15'},
                    {data: [34.50, 37.30, 39.10, 40.50, 41.60, 42.60, 43.30, 44.00, 44.50, 45.00, 46.30, 46.60, 46.10, 46.30, 46.60, 46.80, 47.00, 47.20], label: 'percentil 50'},
                    {data: [35.80, 38.50, 40.30, 41.70, 42.90, 43.80, 44.60, 45.30, 45.80, 46.30, 47.50, 47.90, 47.40, 47.70, 47.90, 48.20, 48.40, 48.60], label: 'percentil 85'},
                    {data: [36.90, 39.50, 41.30, 42.70, 43.90, 44.80, 45.60, 46.30, 46.90, 47.40, 48.40, 48.70, 48.50, 48.80, 49.00, 49.30, 49.50, 49.70], label: 'percentil 97'},
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
