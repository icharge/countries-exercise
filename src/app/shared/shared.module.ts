import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

const MAT_MODULES = [MatListModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MAT_MODULES],
  exports: [...MAT_MODULES],
})
export class SharedModule {}
