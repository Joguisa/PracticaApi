import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsfatherModule } from './components/componentsfather.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, HttpClientModule, ComponentsfatherModule],
})
export class SharedModule {}
