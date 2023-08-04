import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-estimaciones-pagos',
  templateUrl: './estimaciones.component.html',
  styleUrls: ['./estimaciones.component.css']
})
export class EstimacionesPagosComponent implements OnInit {


  contracts:[] = [];
  contrato: any = {};
  estimacion:any = {};
  confirm = false;

  tipoRegistros = [
    {name: 'ANTICIPO', code: 'ANTICIPO'},
    {name: 'ESTIMACIÓN', code: 'ESTIMACIÓN'},
    {name: 'ABONO', code: 'ABONO'},
    {name: 'RETENCIÓN', code: 'RETENCIÓN'} 
  ];

  abonos: any[] = [];


  constructor(public service: AppService,
    private messageService: MessageService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.service.finishProgress();
    for(let i = 1; i <= 200; i++) {
      if(i < 10) {
        this.abonos.push({name: '0' + i, code: '0' + i});
      } else {
        this.abonos.push({name: i.toString(), code: i.toString()});
      }
    }
    
  }


  loadData(event: any) {
    let query = event.query;
    if(query != null && query.length >= 3) {
      this.service.initProgress();
      this.service.filter({folio: query}, "contratos?").then((data: any) => {
        this.service.finishProgress();
        let embedded = data._embedded;
        this.contracts = embedded.contratos;
      });
    }
  }


  getDate(date: any) {
    return date ? new Date(date) : date;
  }

  save() {
    if(this.contrato != null && this.contrato.folio != null && 
      this.estimacion.fechaOperacion != null && this.estimacion.importe != null &&
      this.estimacion.concepto != null && this.estimacion.numeroAbono != null) {
        this.confirm = true;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe ingresar los datos requeridos' });
      }
  }

  confirmSave() {
    this.service.initProgress();
    this.estimacion.contrato = this.contrato.id;
    this.service.post(this.estimacion, 'estimacionPago').then(_data => {
      this.service.finishProgress();
      this.confirm = false;
      window.location.reload();
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado con exitosamente' });
    }).catch(e => {
      this.postError(e);
    });
  }

  postError(error: any) {
    this.service.finishProgress();
    console.error(error);
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al guardar el registro' });
  }

  cancel() {
    this.location.back();
  }
}