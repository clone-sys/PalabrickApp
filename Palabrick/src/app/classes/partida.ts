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


    cargarDesdeArrayJSON() {
        
    }


    insertarIntento(intento: IntentoPartida) {
        this.intentos.push(intento);
    }


    guardarResultadoEnStorage(tipoPartida: string) {
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


    recuperarResultadoDeStorage(tipoPartida: string) {
        if( tipoPartida == 'enCurso' ) {
        }
        else if( tipoPartida == 'finPartida' ) {
        }
        else {
            console.error('El tipo de partida a recuperar no es correcto');
        }
    }
}