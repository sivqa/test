import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { MyMaterialModule } from './my-material-module';
import { ProbesetsModule } from './probesets/probesets.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    Page1Component,
    Page2Component
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MyMaterialModule,
    AppRoutingModule,
    ProbesetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
