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
  route = '';

  constructor(public router: Router,
    public service: AppService) {
      this.getRouteByUrl();
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Administración',
        items: [
          {
            label: 'Contratos',
            icon: 'pi pi-fw pi-file-edit',
            command: (event) => {
              this.router.navigate(["/web-contratos"]);
              this.route = 'Contratos';
            }
          },
          {
            label: 'Estimaciones y pagos',
            icon: 'pi pi-fw pi-money-bill',
            command: (event) => {
              this.router.navigate(["/web-estimaciones-pagos"]);
              this.route = 'Estimaciones y pagos';
            }
          },
          {
            label: 'Estados de cuenta',
            icon: 'pi pi-fw pi-folder'
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
      },
      {
        label: 'Salir',
      }
    ];
  }

  getRouteByUrl() {
    let url:any = this.router.url;
    if(url == '/web-contratos') {
      this.route = 'Contratos';
    } else if(url == '/web-estimaciones-pagos') {
      this.route = 'Estimaciones y pagos';
    }
  }
}
