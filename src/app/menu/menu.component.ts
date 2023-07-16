import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: MenuItem[] = [];
  contracts: Contract[] = [];

  ngOnInit(): void {
    this.menu = [
      {
        label: 'Administración',
        items: [
          {
            label: 'Contratos',
          },
          {
            label: 'Estimaciones y pagos'
          },
          {
            label: 'Estados de cuenta'
          },
          {
            label: 'Gráficas'
          },
          {
            label: 'AO'
          },
          {
            label: 'Administración de usuarios',
            items: [
              {
                label: 'Alta de usuarios'
              },
              {
                label: 'Permisos'
              },
              {
                label: 'Listado de usuarios'
              }
            ]
          }
        ]
      },
      {
        label: 'Obra',
        items: [
          {
            label: 'Avance de obra',
            command: (event) => {console.log("avance de obra")}
          }
        ]
      },
      {
        label: 'Salir',
      }
    ];

    this.contracts = [
      {
        project: 'KAYAK',
        contract: 'KYK00012022',
        specialty: 'CIMENTACION',
        supplier: 'DEKON',
        mount: '$ 550,000.00',
        advance: '$ 550,000.00',
        deposit: '$ 550.000,00',
        balance: '$ 550.000,00',
        cc: 'KYK115'
      }
    ];
  }

}

export interface Contract {
  project?: string;
  contract?: string;
  specialty?: string;
  supplier?: string;
  mount?: string;
  advance?: string;
  deposit?: string;
  balance?: string;
  cc?: string;
}