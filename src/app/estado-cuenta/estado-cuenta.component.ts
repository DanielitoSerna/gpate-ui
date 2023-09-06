import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {CurrencyPipe} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(public service: AppService,
    private money: CurrencyPipe,
    private router: Router,
    private route: ActivatedRoute) {
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
    this.loadEstimaciones();
    this.loadPagos();
  }

  loadEstimaciones() {
    this.abonos = [];
    let filer = {
      contrato: this.contrato.id,
      concepto: "ESTIMACIÓN",
      size: 200,
      sort: 'id'
    }
    this.service.filter(filer, "estimacionPago?").then((data: any) => {
      let embedded = data._embedded;
      embedded.estimacionPago.forEach((element: any) => {
        if(element.concepto == 'ESTIMACIÓN')
        this.abonos.push(element);
      });
    });
  }

  loadPagos() {
    this.valorAnticipos = 0;
    this.valorPendAnticipo = 0;
    this.pagos = [];
    let filer = {
      contrato: this.contrato.id,
      concepto: 'ABONO A ANTICIPO',
      size: 200,
      sort: 'fechaOperacion'
    }
    this.service.filter(filer, "estimacionPago?")
    .then((data: any) => {
      let embedded = data._embedded;
      this.service.finishProgress();
      embedded.estimacionPago.forEach((element: any) => {
        if(element.concepto == 'ESTIMACIÓN') {
          this.abonos.push(element);
        } else {
          if(element.concepto == 'ANTICIPO') {
            this.valorAnticipos = this.valorAnticipos + element.importe;
            this.valorPendAnticipo = this.contrato.anticipoContratado - this.valorAnticipos;
          }
          this.valorAnticipos = this.valorAnticipos + element.importe;
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

  edit(id: number) {
    this.router.navigate(['web-estimacion-pago/' + id]);
  }
}