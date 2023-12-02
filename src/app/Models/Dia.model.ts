export class Dia {
    public iDia: string = undefined;
    public nFecha: number = 0; // fecha en milisegundos
    public Gastos: Gasto[] = [];
    public nEstado: number = 0; // estado del dia

    public nFechaCrear: number = 0;
    public nFechaModificar: number = 0;

    // configuraciones

    public static readonly Estados: Array<{Id: number, Desc: string}> = [
        {
            Id: 0,
            Desc: "No Pago",
        },
        {
            Id: 1,
            Desc: "Pago"
        }
    ];

    public static AsignarValores(Valores: object){

        let dia: Dia = new Dia();

        for (const key in Valores) {
            if (Valores.hasOwnProperty(key)) {

                dia[key] = Valores[key];

            }
        }

        return dia;

    }

    //retorna el total gastado en el dia
    public Total(): number {
        let TotalDia = 0;

        for (let i = 0; i < this.Gastos.length; i++) {

            TotalDia += Number(String(this.Gastos[i].nValor).split("").filter(v => v != ".").join(""));
        }

        return TotalDia;
    }

    public ObjetoDB(): Dia{
        return JSON.parse(JSON.stringify(this));
    }

}

export class Gasto {

    public nValor: any = "";
    public sDescripcion: string = "";

}