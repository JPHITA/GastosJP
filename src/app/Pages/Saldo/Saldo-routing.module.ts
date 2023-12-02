import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaldoPage } from './Saldo.page';

const routes: Routes = [
  {
    path: '',
    component: SaldoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaldoPageRoutingModule {}
