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
  confirmAbono = false;
  liquidado = false;

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
        if(this.estimacion.concepto == 'ABONO') {
          let abono = this.abonos.filter(abono => abono.code == this.estimacion.numeroAbono)[0];
          let pendiente = abono.pendiente - this.estimacion.importe;
          if(pendiente < 0) {
            this.confirmAbono = true;
          } else {
            this.confirm = true;
          }
        } else {
          this.confirm = true;
        }
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
      this.confirmAbono = false;
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

  getConsecutive() {
    if(this.contrato.saldoPendienteContrato == 0) {
      this.liquidado = true
    } else {
      this.liquidado = false;
    }
    if(this.contrato.id && this.estimacion.concepto) {
      this.estimacion.numeroAbono = undefined;
      this.abonos = [];
      let filter = {
        contrato: this.contrato.id,
        concepto: this.estimacion.concepto
      }
      this.service.initProgress();
      if(this.estimacion.concepto == 'ABONO') {
        this.service.filter(filter, 'estimacionPago/search/getNumeroAbonoByContrato?').then(data => {
          this.service.finishProgress();
          let datos = data._embedded;
          if(datos && datos.estimacionPago.length > 0) {
            datos.estimacionPago.forEach((estimacion: any) => {
              let abono = estimacion.importeAbono ? estimacion.importeAbono : 0
              this.abonos.push({
                name: estimacion.numeroAbono, 
                code: estimacion.numeroAbono,
                monto: estimacion.importe,
                abonos: abono,
                pendiente: estimacion.importe - abono
              });
            });
          }
        });
      } else {
        this.service.filter(filter, 'estimacionPago/search/getNumeroAbonoByConcepto?').then(data => {
          this.service.finishProgress();
          let datos = data._embedded;
          if(datos && datos.estimacionPago.length > 0) {
            let estimacion = datos.estimacionPago[0];
            let consecutivo:any = new Number(estimacion.numeroAbono);
            consecutivo = consecutivo + 1;
            let code = '0';
            if(consecutivo <= 9) {
              code = code + consecutivo;
            } else {
              code = consecutivo.toString();
            }
            this.abonos.push({name: code, code: code})
          } else {
            this.abonos.push({name: '01', code: '01'});
          }
          this.estimacion.numeroAbono = this.abonos[0].code;
        });
      }
    }
  }
}