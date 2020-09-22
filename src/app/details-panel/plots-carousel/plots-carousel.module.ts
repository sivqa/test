import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MyMaterialModule } from 'src/app/my-material-module';
import { PlotsCarouselComponent } from './plots-carousel.component';
import { PlateViewPlotModule } from './plate-view-plot/plate-view-plot.module';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AgGridModule,
    FontAwesomeModule,
    MyMaterialModule,
    PlateViewPlotModule,
    CarouselModule
  ],
  providers: [],
  declarations: [PlotsCarouselComponent],
  exports: [PlotsCarouselComponent],
  entryComponents: []
})
export class PlotsCarouselModule { }