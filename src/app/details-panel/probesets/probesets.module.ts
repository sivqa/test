import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProbesetsComponent } from './probesets.component';
import { MyMaterialModule } from 'src/app/my-material-module';

@NgModule({
  imports: [
      ReactiveFormsModule,
      MyMaterialModule,
      FormsModule,
      BrowserModule,
      AgGridModule,
      FontAwesomeModule
  ],
declarations: [ProbesetsComponent],
providers: [
    DecimalPipe
],
exports: [ProbesetsComponent]
})
export class ProbesetsModule { }
