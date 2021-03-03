import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DatesComponent } from './pages/dates/dates.component';
import { DetailRecipeComponent } from './pages/detail-recipe/detail-recipe.component';
import { DetailVacinneComponent } from './pages/detail-vacinne/detail-vacinne.component';
import { EstimulacionComponent } from './pages/estimulacion/estimulacion.component';
import { FinancerComponent } from './pages/financer/financer.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { HitosComponent } from './pages/hitos/hitos.component';
import { LoginComponent } from './pages/login/login.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { Tab1Page } from './tab1/tab1.page';
import { TabsPageModule } from './tabs/tabs.module';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    component:  LoginComponent
  },
  {
    path: 'register',
    component:  RegisterComponent
  },
  {
    path: 'graficas',
    component:  GraficasComponent
  },
  {
    path: 'detail',
    component:  DetailVacinneComponent
  },
  {
    path: 'home',
    component:  TabsPageModule
  },
  {
    path: 'recovery/:dataObj',
    component:  RecoveryComponent
  },
  {
    path: 'dates',
    component:  DatesComponent
  },
  {
    path: 'hitos',
    component:  HitosComponent
  },
  {
    path: 'estimulacion',
    component:  EstimulacionComponent
  },
  {
    path: 'parametros',
    component:  ParametersComponent
  },
  {
    path: 'financer',
    component:  FinancerComponent
  },
  {
    path: 'recetas',
    component:  RecipesComponent
  },
  {
    path: 'detail-recipe',
    component:  DetailRecipeComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
