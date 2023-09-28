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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';

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
        DropdownModule,
        AutoCompleteModule,
        AvatarModule,
        CheckboxModule,
        FileUploadModule,
        ProgressBarModule
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
        DropdownModule,
        AutoCompleteModule,
        AvatarModule,
        CheckboxModule,
        FileUploadModule,
        ProgressBarModule
    ],
    providers: [
        MessageService
    ]
})
export class PrimeModule {

}