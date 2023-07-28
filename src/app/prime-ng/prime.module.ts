import { NgModule } from "@angular/core";

import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { PaginatorModule } from "primeng/paginator";
import { InputTextModule } from "primeng/inputtext";
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        TableModule,
        PanelMenuModule,
        MenuModule,
        ToastModule,
        ButtonModule,
        PaginatorModule,
        InputTextModule,
        ProgressSpinnerModule,
        SidebarModule,
        CalendarModule,
        InputTextareaModule,
        DividerModule,
        TooltipModule,
        DialogModule,
        RadioButtonModule,
        DropdownModule
    ],
    exports: [
        TableModule,
        PanelMenuModule,
        MenuModule,
        ToastModule,
        ButtonModule,
        PaginatorModule,
        InputTextModule,
        ProgressSpinnerModule,
        SidebarModule,
        CalendarModule,
        InputTextareaModule,
        DividerModule,
        TooltipModule,
        DialogModule,
        RadioButtonModule,
        DropdownModule
    ],
    providers: [
        MessageService
    ]
})
export class PrimeModule {

}