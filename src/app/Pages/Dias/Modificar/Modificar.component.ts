import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dia, Gasto } from 'src/app/Models/Dia.Model';
import { DiaService } from 'src/app/Services/dia.service';
import { AlertController } from '@ionic/angular';
import { Historico, GlobalService } from 'src/app/Services/global.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-modificar',
  templateUrl: './Modificar.component.html',
  styleUrls: ['./Modificar.component.scss'],
})
export class ModificarComponent implements OnInit {

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
  @ViewChild("Fecha") FechaEl: ElementRef


  constructor(
    private Route: ActivatedRoute,
    private AlertC: AlertController,
    private Render: Renderer2,
    private Router: Router,
    private DiaS: DiaService,
    private GlobalS: GlobalService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {

    this.Route.queryParamMap.subscribe(v => {

      this.DiaS.VerDia(v.get("iDia")).get().subscribe(v => {

        this._Dia = Dia.AsignarValores(v.data());
        this._Dia.iDia = v.id;
      
        // mostrar fecha 
        this.MostrarFecha();

        //Mostrar formato de los inputs de gastos
        this._Dia.Gastos.forEach((v,i)=> { this.FormatoValor(i) });

      });

    });

  }

 async  Guardar() {

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

    await this.DiaS.ModificarDia(DiaGuardar);

    await this.Router.navigate(["/Dias/Ver", DiaGuardar.iDia]);

  }

  async AsignarFecha() {
    if(this.FechaEl["value"] == null) return;

    // validar que no se seleccione una fecha que ya existe

    let Fecha = new Date(this.FechaEl["value"].split("T")[0]);  // Dia seleccionado
    Fecha.setHours(Fecha.getHours() + 5, 0, 0, 0);

    let DiasRep = await this.DiaS.ValidarDiaRepetido(Fecha.getTime());
    let DiaRep: boolean = false;

    if(!DiasRep.empty){

      DiasRep.forEach(v => { // si existen documentos con la misma fecha
        if(v.id != this._Dia.iDia){ // si existe un dia que no sea el que se esta modificando
          DiaRep = true;
        }
      });

    }

    if (DiaRep) {

      this.MostrarFecha();

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

  MostrarFecha() {
    let fecha = new Date(this._Dia.nFecha);
  
    this.Render.setProperty(this.FechaEl, "value",
      `${fecha.getFullYear()}-${fecha.getMonth() < 9 ? '0' + (fecha.getMonth() + 1) : fecha.getMonth() + 1}-${fecha.getDate() < 10 ? '0'+fecha.getDate() : fecha.getDate()}T00:00-05:00`);
  }

  TotalGastos() {
    let TotalDia = 0;

    for (let i = 0; i < this._Dia.Gastos.length; i++) {

      TotalDia += Number(String(this._Dia.Gastos[i].nValor).split("").filter(v => v != ".").join(""));
    }

    return TotalDia;
  }

  AgregarGasto() {
    this._Dia.Gastos.push(new Gasto);
  }

  EliminarGasto(i) {
    this._Dia.Gastos.splice(i, 1);
  }

  FormatoValor(i, $event = null) {
    
    let ValorValidado = this.ValidarValor(this._Dia.Gastos[i].nValor).split("");

    for (let i = ValorValidado.length - 3; i > 0; i -= 3) {
      ValorValidado.splice(i, 0, ".");
    }

    this._Dia.Gastos[i].nValor = ValorValidado.join("");
    
    if($event != null){
      this.Render.setProperty($event.target, "value", this._Dia.Gastos[i].nValor); // fue nesesario actualizar a mano el DOM porque no actualizaba con ngModel
    }

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
