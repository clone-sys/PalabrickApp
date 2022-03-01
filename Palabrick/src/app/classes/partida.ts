import { IntentoPartida } from "./intento-partida";

export class Partida {

    // Propiedades ==================================================

    resultado: number;
    fecha_inicio: number;
    fecha_fin: number;
    intentos: IntentoPartida[];


    // Métodos ==================================================

    constructor() {
        this.resultado = 0;
        this.fecha_inicio = 0;
        this.fecha_fin = 0;
        this.intentos = [];
    }


    cargarDesdeArrayJSON(partidaJson: string) {
        let partida: any = JSON.parse(partidaJson);

        for (let prop in partida) {
            this[prop] = partida[prop];
        }
    }


    insertarIntento(intento: IntentoPartida) {
        let timestampNow = new Date();

        this.intentos.push(intento);

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


    guardarPartidaEnStorage(tipoPartida: string) {
        if( tipoPartida == 'enCurso' ) {
            console.log('Guardando evolución de la partida para poder recuperarlo si sale del juego => Utilizar el servicio de Manolo para guardar en el "Storage" que proceda');
        }
        else if( tipoPartida == 'finPartida' ) {
            console.log('Guardando resultado de la partida => Utilizar el servicio de Manolo para guardar en el "Storage" que proceda');
        }
        else {
            console.error('El tipo de partida a guardar no es correcto');
        }
    }


    recuperarPartidaDeStorage(tipoPartida: string) {
        if( tipoPartida == 'enCurso' ) {
        }
        else if( tipoPartida == 'finPartida' ) {
        }
        else {
            console.error('El tipo de partida a recuperar no es correcto');
        }
    }
}