import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/my-material-module';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { PlateViewPlotComponent } from './plate-view-plot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
      ReactiveFormsModule,
      MyMaterialModule,
      FormsModule,
      BrowserModule,
      BrowserAnimationsModule,
      AgGridModule
  ],
declarations: [PlateViewPlotComponent],
exports: [PlateViewPlotComponent]
})
export class PlateViewPlotModule { }
