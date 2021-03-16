import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NumberFormatPipe } from './pipe/number-format.pipe';

const MAT_MODULES = [MatListModule, MatInputModule, MatCardModule];

@NgModule({
  declarations: [NumberFormatPipe],
  imports: [CommonModule, ...MAT_MODULES],
  exports: [...MAT_MODULES, NumberFormatPipe],
})
export class SharedModule {}
