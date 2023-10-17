import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
  valorAnterior = 0;
  import = false;
  confirmUp = false;
  file: any = undefined;

  abonos: any[] = [];
  tipoRegistros: any[]= [];
  isEstimacion = false;
  edit = false;

  constructor(public service: AppService,
    private messageService: MessageService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    localStorage.setItem('ROUTE', 'Estimaciones y pagos');
    this.service.finishProgress();
    if(this.router.url.includes('web-estimacion-pago')) {
      const estimacionId = this.route.snapshot.params['id'];
      this.edit = true;
      if(estimacionId) {
        this.getEstimacion(estimacionId);
      }
    }
  }


  loadData(event: any) {
    let query = event.query;
    if(query != null && query.length >= 3) {
      this.service.initProgress();
      this.service.filter({folio: query, sort: 'folio'}, "contratos?").then((data: any) => {
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
        this.confirm = this.validateAnticipo() && this.validateAbono() && this.validateEstimacion();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe ingresar los datos requeridos' });
      }
  }

  validateEstimacion() {
    if(this.estimacion.concepto == 'ESTIMACIÓN') {
      let importeTotal = this.contrato.estimacionesProgramadas - this.valorAnterior;
      importeTotal = importeTotal + this.estimacion.importe;
      if(this.estimacion.importeAbono 
        && this.estimacion.importe < this.estimacion.importeAbono) {
      
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El valor del importe no puede ser inferior al valor abonado' });
        return false;
      } else if(!this.contrato.tieneImporte && importeTotal >  this.contrato.importeContratado) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El valor de la estimación supera el monto contratado' });
        return false;
      }
    }

    return true;
  }

  validateAnticipo() {
    if(this.estimacion.concepto == 'ABONO A ANTICIPO' && (!this.contrato.anticipoContratado || 
      this.contrato.anticipoContratado < this.estimacion.importe)) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El importe del anticipo no puede ser superior al anticipo contratado' });
        return false;
      }
    return true;
  }

  validateAbono() {
    if(this.estimacion.concepto == 'ABONO A ESTIMACIÓN') {
      let abono = this.abonos.filter(abono => abono.code == this.estimacion.numeroAbono)[0];
      let pendiente = abono.pendiente - this.estimacion.importe;
      if(pendiente < 0) {
        this.confirmAbono = true;
        return false;
      }
    }
    return true;
  }

  confirmSave() {
    this.service.initProgress();
    this.estimacion.contrato = this.contrato.id;
    if(this.estimacion.concepto == 'ESTIMACIÓN') {
      this.calculateEstimacion();
    }
    this.service.post(this.estimacion, 'estimacionPago').then(_data => {
      this.service.finishProgress();
      this.confirm = false;
      this.confirmAbono = false;
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado con exitosamente' });
      this.router.navigate(['web-contrato-estado-cuenta/' + this.contrato.id]);
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
    this.getOpciones();
    this.isEstimacion = this.estimacion.concepto == 'ESTIMACIÓN';
    if(this.contrato.saldoPendienteContrato == 0 && !this.contrato.tieneImporte) {
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
      if(this.estimacion.concepto == 'ABONO A ESTIMACIÓN') {
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

  getEstimacion(id: number) {
    this.service.get('estimacionPago/' + id).then(data => {
      this.estimacion = data;
      this.isEstimacion = this.estimacion.concepto == 'ESTIMACIÓN';
      this.estimacion.fechaOperacion = this.service.getDate(this.estimacion.fechaOperacion);
      this.abonos.push({name: data.numeroAbono, code: data.numeroAbono})
      this.loadContract(this.estimacion.contrato);
      this.valorAnterior = this.estimacion.importe;
      this.getOpciones();
    });
  }

  loadContract(id: any) {
    this.service.initProgress();
    this.service.get('contratos/' + id).then(data => {
      this.contrato = data;
      this.service.finishProgress();
    });
  }

  getOpciones() {
    if(this.contrato.anticipoContratado > 0) {
      this.tipoRegistros = [
        {name: 'ABONO A ANTICIPO', code: 'ABONO A ANTICIPO'},
        {name: 'ESTIMACIÓN', code: 'ESTIMACIÓN'},
        {name: 'ABONO A ESTIMACIÓN', code: 'ABONO A ESTIMACIÓN'},
        {name: 'ABONO A CONTRATO', code: 'ABONO A CONTRATO'},
        {name: 'RETENCIÓN', code: 'RETENCIÓN'} 
      ];
    } else {
      this.tipoRegistros = [
        {name: 'ESTIMACIÓN', code: 'ESTIMACIÓN'},
        {name: 'ABONO A ESTIMACIÓN', code: 'ABONO A ESTIMACIÓN'},
        {name: 'ABONO A CONTRATO', code: 'ABONO A CONTRATO'},
        {name: 'RETENCIÓN', code: 'RETENCIÓN'} 
      ];
    }

  }

  export() {
      window.open(this.service.configUrl + 'api/excel/estadoCuenta');
  }

  onUpload(event: any) {
    this.file = event.files[0];
    this.confirmUp = true;
  }

  confirmUpload() {
    this.confirmUp = false;
    this.service.initProgress();
    let formData = new FormData();
    formData.append("file", this.file);
    this.service.post(formData, 'api/cargueMasivoEstimaciones').then(_data => {
      this.service.finishProgress();
      this.import = false;
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Archivo cargado exitosamente'});
    }).catch(e => {
      this.file = undefined;
      this.service.finishProgress();
      if(e.status == 200) {
        this.import = false;
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Archivo cargado exitosamente'});
      } else {
        console.error(e);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error}); 
      }
    });
  }

  calculateEstimacion() {
    this.estimacion.importeBruto = this.getValue(this.estimacion.importeBruto);
    this.estimacion.retencionViciosOcultos =  this.getValue(this.estimacion.retencionViciosOcultos);
    this.estimacion.amortizacionAnticipo = this.getValue(this.estimacion.amortizacionAnticipo);
    this.estimacion.iva = this.getValue(this.estimacion.iva);
    this.estimacion.retencionIva = this.getValue(this.estimacion.retencionIva);
    this.estimacion.isr = this.getValue(this.estimacion.isr);
    this.estimacion.deducciones = this.getValue(this.estimacion.deducciones);
    this.estimacion.importe = this.estimacion.importeBruto - this.estimacion.retencionViciosOcultos - this.estimacion.amortizacionAnticipo
    + this.estimacion.iva - this.estimacion.retencionIva - this.estimacion.isr - this.estimacion.deducciones;
  }

  getValue(value: number) {
    return value ? value : 0;
  }
}