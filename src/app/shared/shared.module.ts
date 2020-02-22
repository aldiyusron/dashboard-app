import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartComponent } from './chart/chart.component';
import { ChartService } from './../service/chart.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ChartComponent
  ],
  declarations: [
    ChartComponent
  ],
  providers: [
    ChartService
  ]
})
export class SharedModule { }
