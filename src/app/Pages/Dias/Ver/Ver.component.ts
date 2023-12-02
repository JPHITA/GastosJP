import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Dia } from 'src/app/Models/Dia.Model';
import { DiaService } from 'src/app/Services/dia.service';
import { ActionSheetController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ver',
  templateUrl: './Ver.component.html',
  styleUrls: ['./Ver.component.scss'],
})
export class VerComponent implements OnInit {

  _Dia: Dia = new Dia();

  Estados = Dia.Estados;
  Mama: boolean = environment.Mama;

  constructor(
    private Route: ActivatedRoute,
    private ActionSheetC: ActionSheetController,
    private NavC: NavController,
    private AlertC: AlertController,
    private DiaS: DiaService
  ) { }

  ngOnInit() { }

  DiaSub;
  ionViewWillEnter() {

    let iDia: string = this.Route.snapshot.paramMap.get("iDia");

    this.DiaSub = this.DiaS.VerDia(iDia).valueChanges().subscribe(v => {

      this._Dia = Dia.AsignarValores(v);
      this._Dia.iDia = iDia;

    });

  }

  async ActionSheet() {
    await (await this.ActionSheetC.create({
      buttons: [
        {
          text: "Modificar",
          icon: "create-outline",
          handler: () => {
            this.NavC.navigateRoot("/Dias/Modificar", { queryParams: { iDia: this._Dia.iDia } });
          }
        },
        {
          text: "Eliminar",
          icon: "trash-outline",
          handler: async () => {

            await (await this.AlertC.create({
              header: "Confirmación",
              message: "¿Esta seguro de salir?",
              buttons: [{
                text: 'Cancelar',
                role: 'cancel',
                handler: () => { }
              },
              {
                text: "Aceptar",
                handler: async () => {

                  await this.DiaS.EliminarDia(this._Dia.iDia);

                  await this.NavC.navigateRoot("/Dias");

                }
              }
              ]
            })).present();

          }
        },
        {
          text: "Cancelar",
          icon: "close-circle-outline",
          cssClass: "Cancelar-ActionSheet",
          role: "cancel"
        }
      ]
    })).present();
  }

  VerEstado() {
    return this.Estados.find(v => v.Id == this._Dia.nEstado).Desc;
  }

  ionViewWillLeave() {
    this.DiaSub.unsubscribe();
  }

}
