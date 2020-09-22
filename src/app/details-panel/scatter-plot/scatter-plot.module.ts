import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ScatterPlotComponent } from './scatter-plot.component';
import { MyMaterialModule } from 'src/app/my-material-module';

@NgModule({
  imports: [
      ReactiveFormsModule,
      MyMaterialModule,
      FormsModule,
      BrowserModule,
      BrowserAnimationsModule,
      AgGridModule
  ],
declarations: [ScatterPlotComponent],
exports: [ScatterPlotComponent]
})
export class ScatterPlotModule { }
