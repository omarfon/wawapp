import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { DatesComponent } from './pages/dates/dates.component';
import { DetailRecipeComponent } from './pages/detail-recipe/detail-recipe.component';
import { DetailVacinneComponent } from './pages/detail-vacinne/detail-vacinne.component';
import { DetaildateComponent } from './pages/detaildate/detaildate.component';
import { EstimulacionComponent } from './pages/estimulacion/estimulacion.component';
import { FinancerComponent } from './pages/financer/financer.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { HitosComponent } from './pages/hitos/hitos.component';
import { LoginComponent } from './pages/login/login.component';
import { MydatesComponent } from './pages/mydates/mydates.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { PayComponent } from './pages/pay/pay.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { TabsPageModule } from './tabs/tabs.module';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
{
  path: '',
  component:  LoginComponent , canActivate: [AuthGuard]
},
{
  path: 'tabs',
  component: TabsPage,
  children: [
    {
      path: 'tab1',
      loadChildren: () => import('../app/tab1/tab1.module').then(m => m.Tab1PageModule), canActivate: [LoginGuard]
    },
    {
      path: 'tab2',
      loadChildren: () => import('../app/tab2/tab2.module').then(m => m.Tab2PageModule)
    },
    {
      path: 'tab3',
      loadChildren: () => import('../app/tab3/tab3.module').then(m => m.Tab3PageModule)
    },
    {
      path: 'graficas',
      component:GraficasComponent
    },
  ]
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
    path: 'detail-vaccine',
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
    path: 'detail-recipe',
    component:  DetailRecipeComponent
  },
  {
    path: 'pay',
    component:  PayComponent
  },
  {
    path: 'mydates',
    component:  MydatesComponent
  },
  {
    path: 'detail-date',
    component:  DetaildateComponent
  },{
    path: 'recovery',
    component:  RecoveryComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
