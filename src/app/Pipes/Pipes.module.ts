import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { CurrencyPipe } from './currency.pipe';
import { DatePipe } from './date.pipe';

@NgModule({
  declarations: [
    CurrencyPipe,
    DatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyPipe,
    DatePipe
  ]
})
export class PipesModule { }
