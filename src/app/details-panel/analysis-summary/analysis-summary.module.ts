import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MyMaterialModule } from 'src/app/my-material-module';
import { AnalysisSummaryComponent } from './analysis-summary.component';
import { BarcodesDropdownRendererComponent } from './share/barcodes-dropdown-renderer.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        MyMaterialModule,
        FormsModule,
        BrowserModule,
        AgGridModule,
        FontAwesomeModule
    ],
    declarations: [AnalysisSummaryComponent, BarcodesDropdownRendererComponent],
    providers: [
        DecimalPipe
    ],
    exports: [AnalysisSummaryComponent],
    entryComponents: [BarcodesDropdownRendererComponent]
})
export class AnalysisSummaryModule { }
