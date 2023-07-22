import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContratosComponent } from './contratos/contratos.component';

const routes: Routes = [
    {
      path: "",
      component: LoginComponent
    },
    {
      path: "contratos",
      component: ContratosComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
