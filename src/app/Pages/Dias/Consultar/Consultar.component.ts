import { Component, OnInit } from '@angular/core';
import { Dia } from 'src/app/Models/Dia.Model';
import { environment } from '../../../../environments/environment';
import { DiaService } from 'src/app/Services/dia.service';
import { ActionSheetController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss'],
})
export class ConsultarComponent implements OnInit {

  Dias: Dia[] = [];

  Mama: boolean = environment.Mama;

  constructor(
    private DiasS: DiaService,
    private NavC: NavController,
    private ActionSheetC: ActionSheetController
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){

    this.DiasS.ConsultarDias().onSnapshot(v => {
     
      let DiasCargar: Dia[] = [];
      this.Dias = [];
      
      v.forEach( r => {
       
        let i = DiasCargar.push(Dia.AsignarValores(r.data()));

        DiasCargar[i - 1]["iDia"] = r.id;
        
      });

      this.Dias = DiasCargar;
      DiasCargar = null;

    });

  }

  async ActionSheet(){
    await (await this.ActionSheetC.create({
      buttons: [
        {
          text: "Agregar",
          icon: "add-circle-outline",
          handler: () => {
            this.NavC.navigateRoot("/Dias/Agregar");
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

}
