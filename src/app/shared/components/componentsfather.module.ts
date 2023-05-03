import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable/datatable.component';
import { MaterialModule } from '../material/material.module';
import { ConfirmComponent } from './confirm/confirm.component';



@NgModule({
  declarations: [DatatableComponent, ConfirmComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [DatatableComponent]
})
export class ComponentsfatherModule { }
