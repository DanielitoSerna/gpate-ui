import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  @ViewChild('paginator', {static: false}) paginator: Paginator;

  visible = false;
  export = false;
  changeState = false;
  editar = false;
  format = '1';
  totalElements = 0;
  search = false;
  estado = 'Inactivo';

  contracts:[] = [];
  contrato:any = {};
  filter: any = {
    page: 0,
    size: 10,
    orderBy: "proyecto",
    orderAscOrDesc: "asc"
  };
  estados = [
    {name: 'Activo', code: 'Activo'},
    {name: 'Inactivo', code: 'Inactivo'} 
  ]

  constructor(public service: AppService,
    private messageService: MessageService,
    private route: Router) {
    this.loadData();
  }

  ngOnInit(): void {
    localStorage.setItem('ROUTE', 'Contratos');
  }

  sort(event: any) {
    const orderAscOrDesc = event.order == 1 ? 'asc' : 'desc';
    if (event.field != this.filter.orderBy || orderAscOrDesc != this.filter.orderAscOrDesc) {
      this.filter.orderBy = event.field;
      this.filter.orderAscOrDesc = orderAscOrDesc;
      this.loadData();
    }
  }

  clean() {
    if(this.search) {
      this.search = false;
      let page = this.filter.page;
      let size = this.filter.size;
      this.filter = {
        page: page,
        size: size
      }
      this.loadData();
    }
  }

  onPageChange(event: any) {
    this.filter.page = event.page;
    this.filter.size = event.rows;
    this.loadData();
  }

  filterData() {
    this.search = true;
    this.paginator.changePage(0);
    this.filter.page = 0;
    this.loadData();
  }

  loadData() {
    this.service.initProgress();
    this.service.filter(this.filter, "contratos?").then((data: any) => {
      this.service.finishProgress();
      let embedded = data._embedded;
      this.contracts = embedded.contratos;
      this.totalElements = data.page.totalElements;
    });
  }

  new() {
    this.contrato = {};
    this.visible = true;
    this.editar = false;
  }

  edit(contrato: any) {
    this.contrato = {...contrato};
    this.contrato.fechaFirmadoCliente = this.service.getDate(this.contrato.fechaFirmadoCliente);
    this.contrato.fechaVencimientoContrato = this.service.getDate(this.contrato.fechaVencimientoContrato);
    this.contrato.fechaFallo = this.service.getDate(this.contrato.fechaFallo);
    this.contrato.fechaSolicitudContrato = this.service.getDate(this.contrato.fechaSolicitudContrato);
    this.contrato.fechaProgramadaEntrega = this.service.getDate(this.contrato.fechaProgramadaEntrega);
    this.contrato.fechaJuridico = this.service.getDate(this.contrato.fechaJuridico);
    this.visible = true;
    this.editar = true;
  }

  save() {
    if(!this.contrato.proyecto || !this.contrato.folio || !this.contrato.especialidad || !this.contrato.centroCosto
      || !this.contrato.proveedor || this.contrato.importeContratado == null || this.contrato.anticipoContratado == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe ingresar los campos requeridos' });
    } else {
      this.service.initProgress();
      if(!this.contrato.estado) {
        this.contrato.estado = 'Activo';
      }
      this.service.post(this.contrato, "contratos").then((data: any) => {
        this.postSave();
      }).catch((error: any) => {
        this.postError(error);
      });

    }
  }

  download() {
    this.export = false;
    let url = this.service.configUrl;
    if(this.format == '1') {
      url = url + 'api/excel/contratos?';
    } else {
      url = url + 'api/pdf/contratos?';
    }
   
    url = url + new URLSearchParams(this.getFilterExport());
    this.format = '1';
    window.open(url);
  }

  getFilterExport() {
    let filter:any = {};
    filter.proyecto = this.getParameterFilter(this.filter.proyecto);
    filter.folio = this.getParameterFilter(this.filter.folio);
    filter.especialidad = this.getParameterFilter(this.filter.especialidad);
    filter.estado = this.getParameterFilter(this.filter.estado); 
    filter.proveedor = this.getParameterFilter(this.filter.proveedor); 
    return filter;
  }

  getParameterFilter(parameter: any) {
    return parameter ? parameter : '';
  }

  postSave() {
    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Contrato guardado con exitosamente' });
    this.visible = false;
    this.changeState = false;
    this.export = false;
    this.loadData();
  }

  postError(error: any) {
    this.service.finishProgress();
    console.error(error);
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al guardar el contrato, verifique que el Número de contrato y/o folio no se encuentre registrado' });
  }

  changeStatus(contrato: any, estado = 'Inactivo') {
    this.contrato = {...contrato};
    this.contrato.estado = estado;
    this.estado = estado;
    this.changeState = true;
  }

  roteEstadoCuenta(id: any) {
    this.route.navigate(['web-contrato-estado-cuenta/' + id]);
  }

}