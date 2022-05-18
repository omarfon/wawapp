import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FinancerService } from 'src/app/services/financer.service';
import { RecipesService } from 'src/app/services/recipes.service';


@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.scss'],
})
export class DetailRecipeComponent implements OnInit {
  public recetas;
  public fecha;

  public datosControl;
  public recipes;
  public patientId;
  public id;
  constructor(public router: Router, 
              public financerSrv: FinancerService,
              public nav: NavController,
              public loading: LoadingController,
              public recipeSrv: RecipesService) { }

              /*
              RECEPCIONA LOS DATOS ENVIADOS DESDE EL RESUMEN DE TODA LAS CITAS DESDE EL SERVICIO PARA MOSTRAR LAS RECETA COMPLETA O EL DETALLE.
              */ 
  async ngOnInit() {
    const loading = await this.loading.create({
        message:'Cargando información...'
    });
    await loading.present();
    this.datosControl = this.financerSrv.dataDoctorFInancer;
    this.patientId = this.financerSrv.patientId;
    if( this.datosControl){
      this.id = this.datosControl.encuentro; 
    }
    const recetas = this.recipeSrv.getRecipes(this.patientId, this.id).subscribe(data => {
      this.recipes = data;
      loading.dismiss();
      // console.log('datos receta:', this.recipes);
      this.fecha = this.recipes[0].prescripciones[0];
      this.recetas = this.recipes[0].prescripciones;
      // console.log('this.recetas:', this.recetas);
      console.log('this.date:', this.fecha);
      console.log(this.datosControl, this.patientId, this.id);

  }, err => {
    console.log(err);
    this.nav.back();
    recetas.unsubscribe();
    loading.dismiss();
  })
}

  // FUNCIÓN PARA REGRESAR A LA PÁGINA ANTERIOR.
  back(){
    this.nav.back();
  }

}
