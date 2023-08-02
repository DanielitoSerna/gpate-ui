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

  tipoRegistros = [
    {name: 'ANTICIPO', code: 'ANTICIPO'},
    {name: 'ESTIMACIÓN', code: 'ESTIMACIÓN'},
    {name: 'ABONO', code: 'ABONO'},
    {name: 'RETENCIÓN', code: 'RETENCIÓN'} 
  ]

  constructor(public service: AppService,
    private messageService: MessageService,
    private location: Location) {
  }

  ngOnInit(): void {
    
  }


  loadData(event: any) {
    let query = event.query;
    this.service.initProgress();
    this.service.filter({folio: query}, "contratos?").then((data: any) => {
      this.service.finishProgress();
      let embedded = data._embedded;
      this.contracts = embedded.contratos;
    });
  }


  getDate(date: any) {
    return date ? new Date(date) : date;
  }

  save() {
    
  }

  cancel() {
    this.location.back();
  }
}