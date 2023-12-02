import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { GlobalService, Historico } from 'src/app/Services/global.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-ModificarSaldo',
  templateUrl: './ModificarSaldo.component.html',
  styleUrls: ['./ModificarSaldo.component.scss'],
})
export class ModificarSaldoComponent implements OnInit {

  constructor(
    private ModalC: ModalController,
    private AlertC: AlertController,
    private GlobalS: GlobalService
  ) { }

  ngOnInit() {}

  async ModificarSaldo(Tipo, Valor, Desc){

    // Asignar valores del DOM a las variables
    Tipo = Tipo.value;
    Valor = (await Valor.getInputElement()).value;
    Desc = (await Desc.getInputElement()).value;

    // validar el valor del cambio
    Valor = parseInt(this.ValidarValor(Valor));
    Valor = Tipo == "Sumar" ? Valor : -Valor;

    if(Valor == 0 || isNaN(Valor)){

      let alert = await this.AlertC.create({
        header: "Error",
        message: "Debe de ingresar un Valor y debe ser diferente de 0",
        buttons: [
          {
            text: "OK",
            role: "cancel"
          }
        ]
      });

      await alert.present();

      return;
    }

    let historico = new Historico();

    historico.ValorCambio = Valor;
    historico.FechaCambio = firestore.Timestamp.now().toMillis();  // hora del servidor
    historico.Desc = Desc;

    await this.GlobalS.ModificarSaldo(historico.ValorCambio);
    await this.GlobalS.AgregarHistorico(historico);

    await this.CerrarModal();

  }

  async FormatoValor(ValorRef){

    ValorRef = await ValorRef.getInputElement();

    let ValorValidado = this.ValidarValor(ValorRef.value).split("");

    for (let i = ValorValidado.length - 3; i > 0 ; i -= 3) {
      ValorValidado.splice(i, 0, ".");
    }

    ValorRef.value = ValorValidado.join("");

  }

  ValidarValor(Valor: string): string{
    
    //Validar que no tenga caracteres no permitidos

    let Permitido = "1234567890";

    let ValorValidado = Valor.split("");

    for (let i = 0; i < ValorValidado.length; i++) {
      
      if (!Permitido.includes(ValorValidado[i])) { // si el caracter no esta en lo permitido
        
        ValorValidado[i] = ""; 

      }
      
    }

    ValorValidado = ValorValidado.filter(v => v != "");

    return ValorValidado.join("");

  }

  async CerrarModal(){
    await this.ModalC.dismiss({
      dismissed: true
    });
  }

}
