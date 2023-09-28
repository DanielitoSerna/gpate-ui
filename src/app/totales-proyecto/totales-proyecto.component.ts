import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-totales-proyecto',
  templateUrl: './totales-proyecto.component.html',
  styleUrls: ['./totales-proyecto.component.css']
})
export class TotalesProyecto implements OnInit {

  totalElements = 0;
  contracts:[] = [];
  totales: any = {};
  filter: any = {
    page: 0,
    size: 15,
    orderBy: "proyecto",
    orderAscOrDesc: "asc"
  };

  constructor(public service: AppService) {
    this.loadData();
  }

  ngOnInit(): void {
    localStorage.setItem('ROUTE', 'Totales por proyecto');
  }

  sort(event: any) {
    const orderAscOrDesc = event.order == 1 ? 'asc' : 'desc';
    if (event.field != this.filter.orderBy || orderAscOrDesc != this.filter.orderAscOrDesc) {
      this.filter.orderBy = event.field;
      this.filter.orderAscOrDesc = orderAscOrDesc;
      this.loadData();
    }
  }

  onPageChange(event: any) {
    this.filter.page = event.page;
    this.filter.size = event.rows;
    this.loadData();
  }

  loadData() {
    this.service.initProgress();
    this.service.filter(this.filter, "viewContratos?").then((data: any) => {
      this.service.finishProgress();
      let embedded = data._embedded;
      this.contracts = embedded.viewContratos;
      this.totalElements = data.page.totalElements;
    });
    this.service.initProgress();
    this.service.filter({}, "viewContratoTotal?").then((data: any) => {
      this.service.finishProgress();
      let embedded = data._embedded;
      this.totales = embedded.viewContratoTotal[0];
    });
  }

  calculateAvanc(proyecto: any) {
    let total = proyecto.pagosAplicados ? proyecto.pagosAplicados * 100 : 0;
    total = proyecto.importeContratado ? total / proyecto.importeContratado: 0;
    return Math.round(total);
  }
}