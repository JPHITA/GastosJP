import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(n: any) {

    let Negativo: boolean = false;

    n = Number(n);

    if(n < 0){

      Negativo = true;
      n = Math.abs(n);

    }

    n = String(n).split("");

    for (let i = n.length - 3; i > 0 ; i -= 3) {
      n.splice(i, 0, ".");
    }

    if (Negativo) {
      n.unshift("-");
    }

    return n.join("");

  }

}
