export class IntentoPartida {
    
    // Propiedades ==================================================

    palabra: string;
    letra1: number;
    letra2: number;
    letra3: number;
    letra4: number;
    letra5: number;


    // Métodos ==================================================

    constructor() {
        this.palabra = '';
        this.letra1 = 2;
        this.letra2 = 2;
        this.letra3 = 2;
        this.letra4 = 2;
        this.letra5 = 2;
    }


    cargarIntento( palabra: string, letra1: number, letra2: number, letra3: number, letra4: number, letra5: number ) {
        this.palabra = palabra;
        this.letra1 = letra1;
        this.letra2 = letra2;
        this.letra3 = letra3;
        this.letra4 = letra4;
        this.letra5 = letra5;
    }
}