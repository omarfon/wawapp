import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { DependentsService } from 'src/app/services/dependents.service';
import { ParematersService } from 'src/app/services/parematers.service';
import * as moment from 'moment';


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
})
export class GraficasComponent implements OnInit {
  public dependens;
  public filtrados;
  public barChartOptions:any = {
         scaleShowVerticalLines: true,
         responsive: true,
         fill: false
  };
  public barChartLabels:string[] = ['mes 0','mes 1', 'mes 2', 'mes 3', 'mes 4', 'mes 5', 'mes 6', 'mes 7', 'mes 8', 'mes 9', 'mes 10', 'mes 11', 'mes 12', 'mes 13', 'mes 14', 'mes 15','mes 16', 'mes 17'];
  public barChartLabelsTwo:string[] = ['45.0', '45.5', '46.0', '46.5', '47.0', '47.5', '48.0', '48.5', '49.0', '49.5', '50.0', '50.5', '51.0', '51.5', '52.0', '52.5', '53.0', '53.5', '54.0', '54.5', '55.0', '55.5', '56.0', '56.5', '57.0'
];
  public lineChartType:any = 'line';
  public barChartLegend:boolean = true; 

  public barChartDataPeso:any[] = [];

  public barChartDataPesoWomen:any[] = [];

  public barChartDataTalla:any[] = [];

  public barChartDataTallaWomen:any[] = [];

  public barChartDataPc:any[] = [];

  public barChartDataPcWomen:any[] = [];

  public pesoTalla:any[] = [];

  public pesoTallaWomen:any[] = [];

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
    { // principal
      backgroundColor: 'rgba(15,48,87,0.5)', 
      borderColor: '#0f3057',
      pointBorderWidth: .4,
    },
  ];

  public barChartColorsTalla
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
    { // principal
      backgroundColor: 'rgba(15,48,87,0.5)', 
      borderColor: '#0f3057',
      pointBorderWidth: .4,
    },
 ];

 public barChartColorsPc
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
  { // principal
    backgroundColor: 'rgba(15,48,87,0.5)', 
    borderColor: '#0f3057',
    pointBorderWidth: .4,
  },
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
  
  public id ;
  private _controls;
  private controls;
  dependends;
  userId;
  _items;
  control;
  parametros;
  _parametros;
  public sex;
  constructor(public nav: NavController,
              public router: Router,
              public loadingCtrl: LoadingController,
              public dependendentSrv: DependentsService,
              public alert: AlertController,
              public parametersSrv: ParematersService) {
                this.getAllDependens();
                
               }

  ngOnInit() {
    
  }

  async getAllDependens(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando información...'
    });
    await loading.present(); 
    this.dependendentSrv.getDependens().subscribe((dependientes:any) =>{
      this.dependens = dependientes.map(dependend =>{
        dependend.edad = moment().diff(dependend.birthdate, 'years');
        /* console.log('dependend:', dependend); */
        return dependend;
      });
      if(this.dependens){
        this.filtrados = this.dependens.filter(x => x.edad < 3)
        this.id = this.filtrados[0].patientId;
        this.sex = this.filtrados[0].sex
        /* console.log(this.id) */
      }
      this.getData();
    /*     this.vacinneSrv.getAllVaccines().subscribe(data => {
          this.vacunas = data; */
    loading.dismiss();
    }, async err => {
      loading.dismiss();
      console.log(err);
      const alert = await this.alert.create({
        header:'No se puede cargar',
        subHeader:'Necesitas crear un dependiente para poder ver las fechas',
        buttons:[{
          text:'Entiendo'
        }]
      });
      alert.present();
    });
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message:'obteniendo parametros...'
    })
    loading.present();
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
          {data: [2.5, 3.4, 4.4, 5.1, 5.6, 6.1, 6.4, 6.7, 7.0, 7.2, 7.5, 7.7, 7.8, 8.0, 8.2, 8.4, 8.5, 8.7], label: 'percentil 3'},
          {data: [2.9, 3.9, 4.9, 5.6, 6.2, 6.7, 7.1, 7.4, 7.7, 7.9, 8.2, 8.4, 8.6, 8.8, 9.0, 9.2, 9.4, 9.6], label: 'percentil 15'},
          {data: [3.3, 4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6, 9.9, 10.1, 10.3, 10,5, 10,7], label: 'percentil 50'},
          {data: [3.9, 5.1, 6.3, 7.2, 7.9, 8.4, 8.9, 9.3, 9.6, 10.0, 10.3, 10.5, 10.8, 11.1, 11.3, 11.6, 11.8, 12.0], label: 'percentil 85'},
          {data: [4.3, 5.7, 7.0, 7.9, 8.6, 9.2, 9.7, 10.2, 10.5, 10.9, 11.2, 11.5, 11.8, 12.1, 12.4, 12.7, 12.9, 13.2], label: 'percentil 97'},
          {data: [...pesos], label: 'Peso'}
        ]

        this.barChartDataPesoWomen = [
          {data: [2.4, 3.2, 4.0, 4.6, 5.1, 5.5, 5.8, 6.1, 6.3, 6.6, 7.0, 7.2, 7.1, 7.3, 7.5, 7.7, 7.8, 8.0], label: 'percentil 3'},
          {data: [2.8, 3.6, 4.5, 5.1, 5.6, 6.1, 6.4, 6.7, 7.0, 7.3, 7.8, 8.0, 7.9, 8.1, 8.3, 8.5, 8.7, 8.8], label: 'percentil 15'},
          {data: [3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 9.2, 9.5, 8.9, 9.2, 9.4, 9.6, 9.8, 10.0], label: 'percentil 50'},
          {data: [3.7, 4.8, 5.9, 6.7, 7.3, 7.8, 8.3, 8.7, 9.0, 9.3, 10.4, 10.7, 10.2, 10.4, 10.7, 10.9, 11.2, 11.4], label: 'percentil 85'},
          {data: [4.2, 5.4, 6.5, 7.4, 8.1, 8.7, 9.2, 9.6, 10.0, 10.4, 11.3, 11.7, 11.3, 11.6, 11.9, 12.2, 12.5, 12.9], label: 'percentil 97'},
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

        this.barChartDataTallaWomen = [
          {data: [45.60, 50.00, 53.20, 55.80, 58.00, 59.90, 61.50, 62.90, 64.30, 65.60, 66.80, 68.00, 69.20, 70.30, 71.30, 72.40, 73.30, 74.30], label: 'percentil 3'},
          {data: [47.20, 51.70, 55.00, 57.60, 59.80, 61.70, 63.40, 64.90, 66.30, 67.60, 68.90, 70.20, 71.30, 72.50, 73.60, 74.70, 75.70, 76.70], label: 'percentil 15'},
          {data: [49.10, 53.70, 57.10, 59.80, 62.10, 64.00, 65.70, 67.30, 68.70, 70.10, 71.50, 72.80, 74.00, 75.20, 76.40, 77.50, 78.60, 79.70], label: 'percentil 50'},
          {data: [51.10, 55.70, 59.20, 62.00, 64.30, 66.30, 68.10, 69.70, 71.20, 72.60, 74.00, 75.40, 76.70, 77.90, 79.20, 80.30, 81.50, 82.60], label: 'percentil 85'},
          {data: [52.70, 57.40, 60.90, 63.80, 66.20, 68.20, 70.00, 71.60, 73.20, 74.70, 76.10, 77.50, 78.90, 80.20, 81.40, 82.70, 83.90, 85.00], label: 'percentil 97'},
          {data: [...tallas], label: 'Talla'}
        ]
  
        this.barChartDataPc = [
          {data: [32.10, 35.10, 36.90, 38.30, 39.40, 40.30, 41.00, 41.70, 42.20, 42.60, 43.00, 43.40, 43.60, 43.90, 44.10, 44.30, 44.50, 44.70], label: 'percentil 3'},
          {data: [33.10, 36.10, 37.90, 39.30, 40.40, 41.30, 42.10, 42.70, 43.20, 43.70, 44.10, 44.40, 44.70, 45.00, 45.20, 45.50, 45.60, 45.80], label: 'percentil 15'},
          {data: [34.50, 37.30, 39.10, 40.50, 41.60, 42.60, 43.30, 44.00, 44.50, 45.00, 45.40, 45.80, 46.10, 46.30, 46.60, 46.80, 47.00, 47.20], label: 'percentil 50'},
          {data: [35.80, 38.50, 40.30, 41.70, 42.90, 43.80, 44.60, 45.30, 45.80, 46.30, 46.70, 47.10, 47.40, 47.70, 47.90, 48.20, 48.40, 48.60], label: 'percentil 85'},
          {data: [36.90, 39.50, 41.30, 42.70, 43.90, 44.80, 45.60, 46.30, 46.90, 47.40, 47.80, 48.20, 48.50, 48.80, 49.00, 49.30, 49.50, 49.70], label: 'percentil 97'},
          {data: [...perimetros], label: 'Perimetro cefalico'}
        ]

        this.barChartDataPcWomen = [
          {data: [31.70, 34.30, 36.00, 37.20, 38.20, 39.00, 39.70, 40.40, 40.90, 41.30, 42.00, 42.40, 42.30, 42.60, 2,.0, 43.10, 43.30, 43.50], label: 'percentil 3'},
          {data: [32.70, 35.30, 37.00, 38.20, 39.30, 40.10, 40.80, 41.50, 42.00, 42.40, 43.30, 43.70, 43.50, 43.80, 44.00, 44.20, 44.40, 44.60], label: 'percentil 15'},
          {data: [33.90, 36.50, 38.30, 39.50, 40.60, 41.50, 42.20, 42.80, 43.40, 43.80, 45.10, 45.50, 44.90, 45.20, 45.40, 45.70, 45.90, 46.10], label: 'percentil 50'},
          {data: [35.10, 37.80, 39.50, 40.80, 41.90, 42.80, 43.50, 44.20, 44.70, 45.20, 46.40, 46.80, 46.30, 46.60, 46.80, 47.10, 47.30, 47.50], label: 'percentil 85'},
          {data: [36.10, 38.80, 40.50, 41.90, 43.00, 43.90, 44.60, 45.30, 45.90, 46.30, 47.40, 47.70, 47.50, 47.70, 48.00, 48.20, 48.50, 48.70], label: 'percentil 97'},
          {data: [...perimetros], label: 'Perimetro cefalico'}
        ]

        this.pesoTalla = [
          {data: [2.1, 2.1, 2.2, 2.3, 2.4, 2.4, 2.5, 2.6, 2.7, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.3, 4.4], label: 'percentil 3'},
          {data: [2.2, 2.3, 2.4, 2.5, 2.5, 2.6, 2.7, 2.8, 2.9, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.6, 3.7, 3.8, 3.9, 4.0, 4.2, 4.3, 4.4, 4.6, 4.7], label: 'percentil 15'},
          {data: [2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.3, 4.4, 4.5, 4.7, 4.8, 5.0, 5.1], label: 'percentil 50'},
          {data: [2.7, 2.8, 2.9, 3.0, 3.1, 3.1, 3.2, 3.3, 3.4, 3.5, 3.7, 3.8, 3.9, 4.0, 4.1, 4.3, 4.4, 4.5, 4.7, 4.8, 5.0, 5.1, 5.3, 5.4, 5.6], label: 'percentil 85'},
          {data: [2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 4.0, 4.1, 4.2, 4.3, 4.5, 4.6, 4.7, 4.9, 5.0, 5.2, 5.4, 5.5, 5.7, 5.9, 6.0], label: 'percentil 97'},
          {data: [...pesos], label: 'Peso/talla'}
        ]

        this.pesoTallaWomen = [
          {data: [2.1, 2.1, 2.2, 2.3, 2.4, 2.4, 2.5, 2.6, 2.7, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.3, 4.4], label: 'percentil 3'},
          {data: [2.2, 2.3, 2.4, 2.5, 2.5, 2.6, 2.7, 2.8, 2.9, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.6, 3.7, 3.8, 3.9, 4.0, 4.2, 4.3, 4.4, 4.6, 4.7], label: 'percentil 15'},
          {data: [2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.3, 4.4, 4.5, 4.7, 4.8, 5.0, 5.1], label: 'percentil 50'},
          {data: [2.7, 2.8, 2.9, 3.0, 3.1, 3.1, 3.2, 3.3, 3.4, 3.5, 3.7, 3.8, 3.9, 4.0, 4.1, 4.3, 4.4, 4.5, 4.7, 4.8, 5.0, 5.1, 5.3, 5.4, 5.6], label: 'percentil 85'},
          {data: [2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 4.0, 4.1, 4.2, 4.3, 4.5, 4.6, 4.7, 4.9, 5.0, 5.2, 5.4, 5.5, 5.7, 5.9, 6.0], label: 'percentil 97'},
          {data: [...pesos], label: 'Peso/talla'}
        ]
  
        /* console.log('this.parametros:', this.parametros, parametros,{pesos, tallas, perimetros}); */
      })
    loading.dismiss();
  }
  
  async getDataForPatient(depe){
    this.id = depe.patientId;
    this.sex = depe.sex;
    /* console.log(this.id); */
    this.getData();
  }

  back(){
    this.nav.back();
  }
}
