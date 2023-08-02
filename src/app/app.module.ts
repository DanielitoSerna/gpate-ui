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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContratosComponent,
    MomentPipe,
    BadgeComponent,
    TruncatePipe,
    EstimacionesPagosComponent
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
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
