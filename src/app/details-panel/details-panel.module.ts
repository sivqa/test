import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DetailsPanelComponent } from './details-panel.component';
import { MyMaterialModule } from 'src/app/my-material-module';
import { ProbesetsModule } from './probesets/probesets.module';
import { AnalysisSummaryModule } from './analysis-summary/analysis-summary.module';
import { ScatterPlotModule } from './scatter-plot/scatter-plot.module';
import { PlotsCarouselModule } from './plots-carousel/plots-carousel.module';

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ProbesetsModule,
        AnalysisSummaryModule,
        ScatterPlotModule,
        PlotsCarouselModule,
        BrowserAnimationsModule,
        MyMaterialModule,
        AgGridModule.withComponents([DetailsPanelComponent]),
        FontAwesomeModule
    ],
    declarations: [
        DetailsPanelComponent
    ],
    exports: [DetailsPanelComponent]
})
export class DetailsPanelModule { }
