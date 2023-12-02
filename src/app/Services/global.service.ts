import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public Saldo: Observable<any>

  constructor(
    private DB: AngularFireDatabase
  ) {

    this.Saldo = DB.object<number>("Global/Saldo").valueChanges();

  }

  public async ModificarSaldo(ValorCambio: number) {


    await this.DB.database.ref("Global/Saldo").once("value", (Saldo) => {
     
      this.DB.object("Global").update({Saldo: Saldo.val() + ValorCambio});

    },
    error => {
      console.log(error)
    });

  }

  //  Historial del saldo

  public ConsultarHistorial() {

    return this.DB.list<Historico>("Global/Historial").valueChanges();

  }

  public async AgregarHistorico(historico: Historico) {

    await this.DB.list("Global/Historial").push(historico);

  }

}


export class Historico {
  public FechaCambio: number
  public ValorCambio: number
  public Desc: string
}