import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { Paginator } from 'primeng/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-saldos-proyecto',
  templateUrl: './saldos-proyecto.component.html',
  styleUrls: ['./saldos-proyecto.component.css']
})
export class SaldosProyecto implements OnInit {

  @ViewChild('paginator', {static: false}) paginator: Paginator;

  now = new Date();
  totalElements = 0;
  contracts:[] = [];
  totales: any[] = [];
  filter: any = {
    page: 0,
    size: 50,
    orderBy: "proveedor",
    orderAscOrDesc: "asc"
  };

  estados = [
    {name: 'Activo', code: 'Activo'},
    {name: 'Inactivo', code: 'Inactivo'} 
  ];

  search = false;
  proyectos = [];
  proyecto: any = {};

  constructor(public service: AppService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    localStorage.setItem('ROUTE', 'Saldos por proyecto');
    if(this.router.url.includes('web-proyecto-saldos-proyecto')) {
      const proyecto = this.route.snapshot.params['proyecto'];
      if(proyecto) {
        this.proyecto.proyecto = proyecto;
        this.loadProject();
      }
    }
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

  loadProject() {
    this.filter.proyecto = this.proyecto.proyecto;
    this.loadData();
    this.loadTotal();
  }

  loadData() {
    this.service.initProgress();
    this.service.filter(this.filter, "viewSaldoContrato?").then((data: any) => {
      this.service.finishProgress();
      let embedded = data._embedded;
      this.contracts = embedded.viewSaldoContrato;
      this.totalElements = data.page.totalElements;
    });
  }

  loadTotal() {
    this.service.initProgress();
    this.service.filter(this.filter, "viewSaldoContratoTotal?").then((data: any) => {
      this.service.finishProgress();
      let embedded = data._embedded;
      this.totales = embedded.viewSaldoContratoTotal;
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

  loadProjects(event: any) {
    let query = event.query;
    if(query != null && query.length >= 3) {
      this.service.initProgress();
      this.service.filter({proyecto: query}, "viewSaldoContratoTotal?").then((data: any) => {
        this.service.finishProgress();
        let embedded = data._embedded;
        this.proyectos = embedded.viewSaldoContratoTotal;
      });
    }
  }
}