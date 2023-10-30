import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContratosComponent } from './contratos/contratos.component';
import { EstimacionesPagosComponent } from './estimaciones-pagos/estimaciones.component';
import { EstadoCuentaComponent } from './estado-cuenta/estado-cuenta.component';
import { TotalesProyecto } from './totales-proyecto/totales-proyecto.component';
import { SaldosProyecto } from './saldos-proyecto/saldos-proyecto.component';

const routes: Routes = [
    {
      path: "web-login",
      component: LoginComponent
    },
    {
      path: "web-contratos",
      component: ContratosComponent
    },
    {
      path: "web-estimaciones-pagos",
      component: EstimacionesPagosComponent
    },
    {
      path: "web-estimacion-pago/:id",
      component: EstimacionesPagosComponent
    },
    {
      path: "web-estado-cuenta",
      component: EstadoCuentaComponent
    },
    {
      path: "web-contrato-estado-cuenta/:id",
      component: EstadoCuentaComponent
    },
    {
      path: "web-totales-proyecto",
      component: TotalesProyecto
    },
    {
      path: "web-saldos-proyecto",
      component: SaldosProyecto
    },
    {
      path: "web-proyecto-saldos-proyecto/:proyecto",
      component: SaldosProyecto
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
