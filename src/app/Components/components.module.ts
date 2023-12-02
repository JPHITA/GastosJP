import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// Componentes

import { TabsComponent } from './Tabs/Tabs.component';

@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    TabsComponent
  ]
})
export class ComponentsModule { }
