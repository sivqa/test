import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProbesetsComponent } from './probesets/probesets.component';
import { TestComponentComponent } from './test-component/test-component.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'test-component', component: TestComponentComponent, data: { title: 'Test' } },
      { path: 'probesets', component: ProbesetsComponent, data: { title: 'Probesets' } }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }