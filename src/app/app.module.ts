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


@NgModule({
  declarations: [AppComponent],
  entryComponents: [ ],
  imports: [
    BrowserModule, 
    ComponentsModule,
    IonicModule.forRoot(), 
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule
    ],
  providers: [{ provide: RouteReuseStrategy, 
            useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
