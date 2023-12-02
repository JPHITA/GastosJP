import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private AlertC: AlertController
  ) {
    this.initializeApp();

    this.platform.backButton.subscribe(() => {
      let alerta = this.AlertC.create({
        header: "Confirmación",
        message: "¿Esta seguro de salir?",
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: "Aceptar",
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
      });

      alerta.then(async (r) => {
        await r.present();
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
