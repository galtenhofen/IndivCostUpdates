import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'NonSubcoded', component: HomeComponent, data: [{view: 'NonSubcoded'}] },
      { path: 'Subcoded', component: HomeComponent, data: [{view: 'Subcoded'}]}, 
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
