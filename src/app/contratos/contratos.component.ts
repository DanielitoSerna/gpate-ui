import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

 
  contracts:[] = [];
  filter: any = {
    page: 0,
    size: 10,
    orderBy: "proyecto",
    orderAscOrDesc: "asc"
  };
  totalElements = 0;
  search = false;

  constructor(public service: AppService) {
    this.loadData();
  }

  ngOnInit(): void {
    
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

}