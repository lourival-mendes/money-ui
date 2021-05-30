import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,

    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
