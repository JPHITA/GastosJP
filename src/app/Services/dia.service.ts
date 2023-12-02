import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { Dia } from '../Models/Dia.Model';

@Injectable({
  providedIn: 'root'
})
export class DiaService {

  private DiaObject: AngularFirestoreCollection<Dia>;

  constructor(
    private DB: AngularFirestore
  ){

    this.DiaObject = this.DB.collection("Dias");

   }

  public async CrearDia(dia: Dia){

    //Asignar fechas iniciales
    dia.nFechaCrear = firestore.Timestamp.now().toMillis();
    dia.nFechaModificar = dia.nFechaCrear;

    await this.DiaObject.add(dia.ObjetoDB());

  }

  public ConsultarDias(){
    return this.DiaObject.ref.orderBy("nFecha", "desc");
  }

  public VerDia(iDia: string){
    return this.DiaObject.doc<Dia>(iDia);
  }

  public async ModificarDia(dia: Dia){

    dia.nFechaModificar = firestore.Timestamp.now().toMillis();

    await this.DiaObject.doc<Dia>(dia.iDia).update(dia.ObjetoDB());

  }

  public EliminarDia(iDia: string){
    return this.DiaObject.doc(iDia).delete();
  }

  public ValidarDiaRepetido(Fecha: number){

    return this.DiaObject.ref.where("nFecha", "==", Fecha).get();

  }

}