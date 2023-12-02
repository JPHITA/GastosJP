import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Date'
})
export class DatePipe implements PipeTransform {

  private Nombres = {
    Dias: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado"
    ],
    Meses: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ]
  };

  transform(value: any, Corto: boolean = false) {
    
    let r: string = "";

    let Fecha = new Date(value);

    r += this.Nombres.Dias[Fecha.getDay()] + ", " + 
         (Fecha.getDate() < 10 ? "0" + Fecha.getDate() : Fecha.getDate()) +
         " de " + this.Nombres.Meses[Fecha.getMonth()] + " del " + Fecha.getFullYear();

    return r;

  }

}
