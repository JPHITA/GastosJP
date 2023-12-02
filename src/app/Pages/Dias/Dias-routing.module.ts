import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarComponent } from './Consultar/Consultar.component';
import { AgregarComponent } from './Agregar/Agregar.component';
import { VerComponent } from './Ver/Ver.component';
import { ModificarComponent } from './Modificar/Modificar.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultarComponent
  },
  {
    path: "Agregar",
    component: AgregarComponent
  },
  {
    path:"Ver/:iDia",
    component: VerComponent
  },
  {
    path: "Modificar",
    component: ModificarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiasPageRoutingModule {}
