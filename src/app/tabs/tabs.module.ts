import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TabsPageRoutingModule } from './tabs-routing.module';


import { TabsPage } from './tabs.page';
import { ComponentsModule } from '../components/components.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    MatExpansionModule
  ],
  entryComponents: [
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
