import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-totales-proyecto',
  templateUrl: './totales-proyecto.component.html',
  styleUrls: ['./totales-proyecto.component.css']
})
export class TotalesProyecto implements OnInit {

  @ViewChild('paginator', {static: false}) paginator: Paginator;

  totalElements = 0;
  contracts:[] = [];
  totales: any[] = [];
  filter: any = {
    page: 0,
    size: 10,
    orderBy: "proyecto",
    orderAscOrDesc: "asc"
  };

  estados = [
    {name: 'Activo', code: 'Activo'},
    {name: 'Inactivo', code: 'Inactivo'} 
  ];

  search = false;

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
    this.service.filter(this.filter, "viewContratoTotal?").then((data: any) => {
      this.service.finishProgress();
      let embedded = data._embedded;
      this.totales = embedded.viewContratoTotal;
    });
  }

  calculateAvanc(proyecto: any) {
    let total = proyecto.pagosAplicados ? proyecto.pagosAplicados * 100 : 0;
    total = proyecto.importeContratado ? total / proyecto.importeContratado: 0;
    return Math.round(total);
  }

  filterData() {
    this.search = true;
    this.paginator.changePage(0);
    this.filter.page = 0;
    this.loadData();
  }

  clean() {
    if(this.search) {
      this.search = false;
      let page = this.filter.page;
      this.filter = {
        page: page,
        size: 10,
        orderBy: "proyecto",
        orderAscOrDesc: "asc"
      }
      this.loadData();
    }
  }
}