import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContratosComponent } from './contratos/contratos.component';
import { EstimacionesPagosComponent } from './estimaciones-pagos/estimaciones.component';

const routes: Routes = [
    {
      path: "",
      component: LoginComponent
    },
    {
      path: "web-contratos",
      component: ContratosComponent
    },
    {
      path: "web-estimaciones-pagos",
      component: EstimacionesPagosComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
