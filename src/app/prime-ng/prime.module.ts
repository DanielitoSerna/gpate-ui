import { NgModule } from "@angular/core";

import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
    imports: [
        TableModule,
        PanelMenuModule,
    ],
    exports: [
        TableModule,
        PanelMenuModule,
    ]
})
export class PrimeModule {

}