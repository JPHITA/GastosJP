import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaldoPageRoutingModule } from './Saldo-routing.module';

import { SaldoPage } from './Saldo.page';

// Componentes
import { ComponentsModule } from '../../Components/components.module';

// Pipes
import { PipesModule } from '../../Pipes/pipes.module';

import { ModificarSaldoComponent } from './Modals/ModificarSaldo/ModificarSaldo.component';
import { VerHistoricoComponent } from './Modals/VerHistorico/VerHistorico.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaldoPageRoutingModule,

    ComponentsModule,
    PipesModule
  ],
  declarations: [
    SaldoPage,

    ModificarSaldoComponent,
    VerHistoricoComponent,

  //   CurrencyPipe,
  //   DatePipe
  ]
})
export class SaldoPageModule {}
