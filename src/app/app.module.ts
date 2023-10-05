import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContratosComponent } from './contratos/contratos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeModule } from './prime-ng/prime.module';
import { AppService } from './app.service';
import { MomentPipe } from './pipes/moment.pipe';
import { BadgeComponent } from './badge/badge.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { EstimacionesPagosComponent } from './estimaciones-pagos/estimaciones.component';
import { EstadoCuentaComponent } from './estado-cuenta/estado-cuenta.component';
import { CurrencyPipe } from '@angular/common';
import { TotalesProyecto } from './totales-proyecto/totales-proyecto.component';
import { SaldosProyecto } from './saldos-proyecto/saldos-proyecto.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContratosComponent,
    MomentPipe,
    BadgeComponent,
    TruncatePipe,
    EstimacionesPagosComponent,
    EstadoCuentaComponent,
    TotalesProyecto,
    SaldosProyecto
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PrimeModule,
    HttpClientModule
    
  ],
  providers: [
    AppService,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
