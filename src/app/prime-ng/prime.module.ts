import { NgModule } from "@angular/core";

import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { PaginatorModule } from "primeng/paginator";
import { InputTextModule } from "primeng/inputtext";
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
    imports: [
        TableModule,
        PanelMenuModule,
        MenuModule,
        ToastModule,
        ButtonModule,
        PaginatorModule,
        InputTextModule,
        ProgressSpinnerModule
    ],
    exports: [
        TableModule,
        PanelMenuModule,
        MenuModule,
        ToastModule,
        ButtonModule,
        PaginatorModule,
        InputTextModule,
        ProgressSpinnerModule
    ],
    providers: [
        MessageService
    ]
})
export class PrimeModule {

}