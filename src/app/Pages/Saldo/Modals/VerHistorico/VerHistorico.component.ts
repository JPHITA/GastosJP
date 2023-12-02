import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-VerHistorico',
  templateUrl: './VerHistorico.component.html',
  styleUrls: ['./VerHistorico.component.scss'],
})
export class VerHistoricoComponent implements OnInit {

  @Input() Historico;

  constructor(
    private ModalC: ModalController
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){}

  async CerrarModal(){
    await this.ModalC.dismiss();
  }

}
