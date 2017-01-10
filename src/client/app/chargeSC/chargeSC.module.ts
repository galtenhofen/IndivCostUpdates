import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeComponent } from './charge.component';
import { ChargeService } from './charge.service';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ChargeComponent],
  exports: [ChargeComponent],
  providers: [ChargeService]
})
export class ChargeModule { }
