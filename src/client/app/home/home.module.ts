import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChargeModule } from '../charge/charge.module';
import { ChargeService } from '../charge/charge.service';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule, ChargeModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [ChargeService]
})
export class HomeModule { }
