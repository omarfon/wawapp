import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DetailVacunaComponent } from "./detail-vacuna/detail-vacuna.component";
import { GrillaVacunaComponent } from "./grilla-vacuna/grilla-vacuna.component";
import { MenuComponent } from "./menu/menu.component";


@NgModule({
    declarations:[
        MenuComponent,
        DetailVacunaComponent,
        GrillaVacunaComponent
    ],
    exports:[
        MenuComponent,
        DetailVacunaComponent,
        GrillaVacunaComponent
    ],
    imports:[
        CommonModule,
        IonicModule
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ]
})

export class ComponentsModule{}