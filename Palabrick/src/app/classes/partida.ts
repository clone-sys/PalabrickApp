import { IntentoPartida } from "./intento-partida";

export class Partida {

    // Propiedades ==================================================

    palabra: string;
    resultado: number;
    fecha_inicio: number;
    fecha_fin: number;
    intentos: IntentoPartida[];


    // Métodos ==================================================

    constructor() {
        this.palabra = '';
        this.resultado = 0;
        this.fecha_inicio = 0;
        this.fecha_fin = 0;
        this.intentos = [];

        let intento = new IntentoPartida();
        intento.palabra = '';
        this.intentos[0] = intento;
    }


    cargarDesdeArrayJSON(partidaJson: string) {
        let partida: any = JSON.parse(partidaJson);

        for( let prop in partida ) {
            this[prop] = partida[prop];
        }
    }


    insertarIntento(intento: IntentoPartida, posicion: string, enviar: boolean ) {
        this.intentos[posicion] = intento;
        
        // Si estoy enviando
        if( enviar ) {
            let timestampNow = new Date();

            // Actualizo la fecha de inicio/fin
            if( this.intentos.length == 1 ) {
                this.fecha_inicio = timestampNow.getTime();
            }
            else if( this.intentos.length == 6 ) {
                this.fecha_fin = timestampNow.getTime();
            }

            // Actualizo si ha resuelto o ha agotado el número de intentos
            if( intento.letra1 + intento.letra2 + intento.letra3 + intento.letra4 + intento.letra5 == 5 ) {
                this.resultado = this.intentos.length;
                this.fecha_fin = timestampNow.getTime();
            }
            else if( this.intentos.length == 6 ) {
                this.resultado = 0;
            }
        }
    }
}