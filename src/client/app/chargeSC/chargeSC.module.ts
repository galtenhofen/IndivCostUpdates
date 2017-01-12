import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeComponentSC } from './chargeSC.component';
import { ChargeServiceSC } from './chargeSC.service';
import {ChargeSCFilterPipe} from './chargeSC.pipe';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ChargeComponentSC, ChargeSCFilterPipe],
  exports: [ChargeComponentSC],
  providers: [ChargeServiceSC]
})
export class ChargeModuleSC { }
