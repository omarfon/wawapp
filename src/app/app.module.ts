import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//importaciones de material
import {MatExpansionModule} from '@angular/material/expansion';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { DatesComponent } from './pages/dates/dates.component';
import { DetailRecipeComponent } from './pages/detail-recipe/detail-recipe.component';
import { CuidadobebeComponent } from './modals/cuidadobebe/cuidadobebe.component';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { EstimulacionComponent } from './pages/estimulacion/estimulacion.component';
import { NutricionComponent } from './modals/nutricion/nutricion.component';
import { HitosComponent } from './pages/hitos/hitos.component';

import { FlashComponent } from './components/flash/flash.component';
import { BebefamiliaComponent } from './modals/bebefamilia/bebefamilia.component';
import { CreateParentComponent } from './modals/create-parent/create-parent.component';
import { DetailVacinneComponent } from './pages/detail-vacinne/detail-vacinne.component';
import { RegisterComponent } from './pages/register/register.component';
import { HitosOneComponent } from './modals/hitos/hitos.component';
import { VacunaComponent } from './modals/vacuna/vacuna.component';
import { FinancerComponent } from './pages/financer/financer.component';
import { PayComponent } from './pages/pay/pay.component';
import { LoginComponent } from './pages/login/login.component';


registerLocaleData(localeEs);


@NgModule({
  declarations: [AppComponent, ParametersComponent,EstimulacionComponent,DatesComponent,DatesComponent, DetailRecipeComponent, DetailRecipeComponent,NutricionComponent,HitosComponent,FlashComponent,BebefamiliaComponent,CreateParentComponent,DetailVacinneComponent,RegisterComponent,HitosOneComponent,VacunaComponent,FinancerComponent,DatesComponent,PayComponent,DatesComponent,LoginComponent,
  GraficasComponent,CuidadobebeComponent],
  entryComponents: [ CreateParentComponent],
  imports: [
    BrowserModule, 
    ComponentsModule,
    IonicModule.forRoot(), 
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    ChartsModule,
    Ng2GoogleChartsModule
    ],
  providers: [{ 
                provide: LOCALE_ID, useValue: "es",
            useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
