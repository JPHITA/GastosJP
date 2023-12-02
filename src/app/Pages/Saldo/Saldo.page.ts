import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { GlobalService, Historico } from '../../Services/global.service';
import { ModalController } from '@ionic/angular';

// Modals
import { ModificarSaldoComponent } from './Modals/ModificarSaldo/ModificarSaldo.component';
import { VerHistoricoComponent } from './Modals/VerHistorico/VerHistorico.component';

@Component({
  selector: 'app-saldo',
  templateUrl: './Saldo.page.html',
  styleUrls: ['./Saldo.page.scss'],
})
export class SaldoPage {

  Saldo: number = 0;
  Historal: Historico[] = [];

  @ViewChild("SaldoEl") SaldoEl: ElementRef;

  constructor(
    private GlobalS: GlobalService,
    private Render2: Renderer2,
    private ModalC: ModalController
  ) { }

  private SaldoSub;
  private HistorialSub;

  ionViewWillEnter() {

    // Consultar Saldo
    this.SaldoSub = this.GlobalS.Saldo.subscribe(v => {

      this.Saldo = v;

      let Color = this.Saldo >= 0 ? "white" : "red";
      this.Render2.setStyle(this.SaldoEl["el"], "color", Color);

    });

    // Consultar Historial
    this.HistorialSub = this.GlobalS.ConsultarHistorial().subscribe(v => {

      // Ordenar array de forma desecendente desde la mayor fecha a la menor
      v = v.sort((a, b) => b.FechaCambio - a.FechaCambio);
      v.map(v => v["Color"] = v.ValorCambio >= 0 ? "green" : "red");

      this.Historal = v;

    });

  }

  ionViewWillLeave() {
    this.SaldoSub.unsubscribe();
    this.HistorialSub.unsubscribe();
  }

  async ModificarSaldo(){

    let modal = await this.ModalC.create({
      component: ModificarSaldoComponent
    });

    await modal.present();

  }

  async VerHistorico(historico){
    
    let modal = await this.ModalC.create({
      component: VerHistoricoComponent,
      componentProps: {
        "Historico": historico
      }
    });

    await modal.present();

  }

}
