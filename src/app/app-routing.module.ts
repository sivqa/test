import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'test', component: TestComponentComponent, data: { title: 'Test' } }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }