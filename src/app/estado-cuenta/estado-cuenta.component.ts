import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {CurrencyPipe} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuentaComponent implements OnInit {


  contracts:[] = [];
  contrato: any = {};

  abonos: any[] = [];
  pagos: any[] = [];
  valorAnticipos = 0;
  valorPendAnticipo = 0;

  status = 'WARNING';
  messageStatus = '';
  delete = false;
  estimacion: any = {};
  consecutivo = '';

  constructor(public service: AppService,
    private money: CurrencyPipe,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    localStorage.setItem('ROUTE', 'Estado de cuenta');
    if(this.router.url.includes('web-contrato-estado-cuenta')) {
      const contractId = this.route.snapshot.params['id'];
      if(contractId) {
        this.loadContract(contractId);
      }
    }
  }

  loadContract(id: any) {
    this.service.initProgress();
    this.service.get('contratos/' + id).then(data => {
      this.contrato = data;
      this.getContractData();
    });
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

  getContractData() {
    this.loadPagos();
  }

  loadPagos() {
    this.getStatusContract();
    this.valorAnticipos = 0;
    this.valorPendAnticipo = 0;
    this.pagos = [];
    this.abonos = [];
    let filer = {
      contrato: this.contrato.id,
      size: 200,
      sort: 'fechaOperacion, numeroAbono'
    }
    this.service.filter(filer, "estimacionPago?")
    .then((data: any) => {
      let embedded = data._embedded;
      this.service.finishProgress();
      embedded.estimacionPago.forEach((element: any) => {
        if(element.concepto == 'ESTIMACIÓN') {
          this.abonos.push(element);
        } else {
          if(element.concepto == 'ABONO A ANTICIPO') {
            this.valorAnticipos = this.valorAnticipos + element.importe;
            this.valorPendAnticipo = this.contrato.anticipoContratado - this.valorAnticipos;
          }
          this.pagos.push(element);
        }
      });
    });
  }

  getLabelAbono(importe: number, importePagado: number) {
    if(importe > importePagado) {
      return this.money.transform(importe - importePagado);
    }
    return 'PAGADO';
  }

  download() {
    if(this.contrato.id) {
      window.open(this.service.configUrl + 'api/pdf/estadoCuenta?idContrato=' + this.contrato.id);
    }
  }

  export() {
    if(this.contrato.id) {
      window.open(this.service.configUrl + '/api/excel/estadoCuenta?contrato=' + this.contrato.id);
    }
  }

  edit(id: number) {
    this.router.navigate(['web-estimacion-pago/' + id]);
  }

  getStatusContract() {
    if(this.contrato.estimacionesProgramadas > this.contrato.importeContratado) {
      this.status = 'ERROR';
      this.messageStatus = 'El valor de las estimaciones supera el valor contratado';
    } else if (this.contrato.saldoPendienteContrato > 0) {
      this.status = 'WARNING';
      this.messageStatus = 'Contrato pendiente por liquidar';
    } else if (this.contrato.saldoPendienteContrato == 0) {
      this.status = 'SUCCESS';
      this.messageStatus = 'Contrato liquidado';
    }
  }

  openDelete(estimacion: any, index: any) {
    this.estimacion = estimacion;
    this.consecutivo = index;
    this.delete = true;
  }

  onDelete() {
    this.service.initProgress();
    this.service.delete('api/eliminarEstimacionPago?idEstimacion=' + this.estimacion.id).then(_data => {
      this.loadContract(this.contrato.id);
      this.service.finishProgress();
      this.delete = false;
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro eliminado exitosamente'});
    }).catch(e => {
      if(e.status == 200) {
        this.service.finishProgress();
        this.delete = false;
        this.loadContract(this.contrato.id);
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro eliminado exitosamente'});
      } else {
        console.error(e);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error}); 
      }    
    });
  }
}