import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gpate-ui';
  items: MenuItem[] | undefined = [];
  routeName: any = '';
  public isCollapsed = true;

  constructor(public router: Router,
    public service: AppService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Administración',
        items: [
          {
            label: 'Contratos',
            icon: 'pi pi-fw pi-file-edit',
            routerLink: '/web-contratos'
          },
          {
            label: 'Estimaciones y pagos',
            icon: 'pi pi-fw pi-money-bill',
            routerLink: '/web-estimaciones-pagos'
          },
          {
            label: 'Estado de cuenta',
            icon: 'pi pi-fw pi-folder',
            routerLink: '/web-estado-cuenta'
          },
          {
            label: 'Totales por proyecto',
            icon: 'pi pi-dollar',
            routerLink: '/web-totales-proyecto'
          },
          {
            label: 'Saldos por proyecto',
            icon: 'pi pi-bitcoin',
            routerLink: '/web-saldos-proyecto'
          },
          {
            label: 'Gráficas',
            icon: 'pi pi-fw pi-chart-bar'
          },
          {
            label: 'AO',
            icon: 'pi pi-fw pi-chart-line'
          },
        ]
      },
      {
        label: 'Contrucción',
        items: [
          {
            label: 'Avance de obra',
            icon: 'pi pi-fw pi-directions',
            command: (event) => {console.log("avance de obra")}
          }
        ]
      },
      {
        label: 'Comercialización'
      },
      {
        label: 'Administración de usuarios',
        items: [
          {
            label: 'Alta de usuarios',
            icon: 'pi pi-fw pi-check'
          },
          {
            label: 'Permisos',
            icon: 'pi pi-fw pi-id-card'
          },
          {
            label: 'Listado de usuarios',
            icon: 'pi pi-fw pi-users'
          }
        ]
      }
    ];
  }

  getRoute() {
    this.routeName = localStorage.getItem('ROUTE')
    return this.routeName;
  }

  goToMenu(): void {
    this.isCollapsed = true;
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
