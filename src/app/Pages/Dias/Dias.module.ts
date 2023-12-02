import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiasPageRoutingModule } from './Dias-routing.module';

import { ConsultarComponent } from './Consultar/Consultar.component';
import { AgregarComponent } from './Agregar/Agregar.component';
import { VerComponent } from './Ver/Ver.component';
import { ModificarComponent } from './Modificar/Modificar.component';

// Componentes
import { ComponentsModule } from '../../Components/components.module';

// Pipes
import { PipesModule } from '../../Pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiasPageRoutingModule,

    ComponentsModule,
    PipesModule
  ],
  declarations: [
    ConsultarComponent,
    AgregarComponent,
    VerComponent,
    ModificarComponent,
  ]
})
export class DiasPageModule {}
