import { Component, OnInit, Renderer2 } from '@angular/core';
import { Dia, Gasto } from 'src/app/Models/Dia.Model';
import { DiaService } from 'src/app/Services/dia.service';
import { AlertController, NavController } from '@ionic/angular';
import { GlobalService, Historico } from 'src/app/Services/global.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-agregar',
  templateUrl: './Agregar.component.html',
  styleUrls: ['./Agregar.component.scss'],
})
export class AgregarComponent implements OnInit {

  _Dia: Dia = new Dia();

  NomMeses = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "Jun",
    "Jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic"
  ];
  Estados = Dia.Estados;

  constructor(
    private DiaS: DiaService,
    private GlobalS: GlobalService,
    private Renderer: Renderer2,
    private AlertC: AlertController,
    private Router: NavController
  ) { }

  ngOnInit() { }

  async AsignarFecha(FechaEl) {
    if (FechaEl.value == null) return;

    // validar que no se seleccione una fecha que ya existe

    let Fecha = new Date(FechaEl.value.split("T")[0]);  // Dia seleccionado
    Fecha.setHours(Fecha.getHours() + 5, 0, 0, 0);

    let DiaRepetido = await this.DiaS.ValidarDiaRepetido(Fecha.getTime());

    if (!DiaRepetido.empty) {  // si existen documentos con la misma fecha

      FechaEl.value = null;
      this._Dia.nFecha = undefined;

      await (await this.AlertC.create({
        header: "Error",
        message: "Ya existe un dia con esta misma fecha",
        buttons: [
          {
            text: "OK",
            role: "cancel"
          }
        ]
      })).present();

      return;
    }

    // Asignar fecha al objeto

    this._Dia.nFecha = Fecha.getTime();

  }

  AgregarGasto() {
    this._Dia.Gastos.push(new Gasto);
  }

  EliminarGasto(i) {
    this._Dia.Gastos.splice(i, 1);
  }

  TotalGastos() {
    let TotalDia = 0;

    for (let i = 0; i < this._Dia.Gastos.length; i++) {

      TotalDia += Number(String(this._Dia.Gastos[i].nValor).split("").filter(v => v != ".").join(""));
    }

    return TotalDia;
  }

  async Guardar() {

    let DiaGuardar = new Dia();
    let Error: boolean = false;
    let ErrorMsg = "Los Siguientes valores deben ser corregidos: \n";

    for (const key in this._Dia) {
      if (!Array.isArray(this._Dia[key]) && Object(DiaGuardar).hasOwnProperty(key)) {
        
        DiaGuardar[key] = this._Dia[key];
        
      }
    }

    for (let i = 0; i < this._Dia.Gastos.length; i++) {
      
      DiaGuardar.Gastos.push(new Gasto());

      DiaGuardar.Gastos[i].nValor = Number(this.ValidarValor(this._Dia.Gastos[i].nValor));
      DiaGuardar.Gastos[i].sDescripcion = this._Dia.Gastos[i].sDescripcion;

      if(isNaN(DiaGuardar.Gastos[i].nValor)){
        DiaGuardar.Gastos[i].nValor = 0;
      }
      
    }

    if ([0, null, undefined].includes(DiaGuardar.nFecha)) { // si no se definio la fecha
      Error = true;
      ErrorMsg += " - Fecha \n";
    }

    if ([null, undefined].includes(DiaGuardar.nEstado)) { // si no se definio el estado
      Error = true;
      ErrorMsg += " - Estado \n";
    }

    if (Error) {

      await (await this.AlertC.create({
        header: "Error",
        message: ErrorMsg,
        buttons: [
          {
            text: "OK",
            role: "cancel"
          }
        ]
      })).present();

      return;

    }

    if(DiaGuardar.nEstado == 1){

      let historico = new Historico();

      historico.ValorCambio = -DiaGuardar.Total();
      historico.FechaCambio = firestore.Timestamp.now().toMillis();

      let FechaPago = new Date(DiaGuardar.nFecha);
      historico.Desc = `Pago dia ${FechaPago.getDate()}/${FechaPago.getMonth() + 1}/${FechaPago.getFullYear()}`;

      await this.GlobalS.ModificarSaldo(-DiaGuardar.Total());
      await this.GlobalS.AgregarHistorico(historico);
    }

    await this.DiaS.CrearDia(DiaGuardar);

    await this.Router.navigateRoot("/Dias");

  }

  FormatoValor(i, $event) {

    let ValorValidado = this.ValidarValor(this._Dia.Gastos[i].nValor).split("");

    for (let i = ValorValidado.length - 3; i > 0; i -= 3) {
      ValorValidado.splice(i, 0, ".");
    }

    this._Dia.Gastos[i].nValor = ValorValidado.join("");
    this.Renderer.setAttribute($event.target, "value", this._Dia.Gastos[i].nValor); // fue nesesario actualizar a mano el DOM porque no actualizaba con ngModel

  }

  ValidarValor(Valor: string | number): string {

    let Permitido = "1234567890";

    let ValorValidado = String(Valor).split("");

    for (let i = 0; i < ValorValidado.length; i++) {

      if (!Permitido.includes(ValorValidado[i])) { // si el caracter no esta en lo permitido

        ValorValidado[i] = "";

      }

    }

    ValorValidado = ValorValidado.filter(v => v != "");

    return ValorValidado.join("");

  }

}
