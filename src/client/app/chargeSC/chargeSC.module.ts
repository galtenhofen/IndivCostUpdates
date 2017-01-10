import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeComponentSC } from './chargeSC.component';
import { ChargeServiceSC } from './chargeSC.service';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ChargeComponentSC],
  exports: [ChargeComponentSC],
  providers: [ChargeServiceSC]
})
export class ChargeModuleSC { }
