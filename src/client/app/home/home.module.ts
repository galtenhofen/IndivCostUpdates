import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChargeFilterPipe } from '../charge/charge.pipe';
import { ChargeSCFilterPipe } from '../chargeSC/chargeSC.pipe';
import { ChargeModule } from '../charge/charge.module';
import { ChargeService } from '../charge/charge.service';
import { ChargeModuleSC } from '../chargeSC/chargeSC.module';
import { ChargeServiceSC } from '../chargeSC/chargeSC.service';


@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule, ChargeModule, ChargeModuleSC],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
