import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Saldo',
    pathMatch: "full"
  },
  {
    path: "Saldo",
    loadChildren: () => import("./Pages/Saldo/Saldo.module").then(m => m.SaldoPageModule)
  },
  {
    path: "Dias",
    loadChildren: () => import("./Pages/Dias/Dias.module").then(m => m.DiasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
