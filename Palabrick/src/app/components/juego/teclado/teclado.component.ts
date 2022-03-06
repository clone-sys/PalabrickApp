import { Component, OnInit } from '@angular/core';
import { TecladoService } from 'src/app/services/teclado.service'


@Component({
    selector: 'app-teclado',
    templateUrl: './teclado.component.html',
    styleUrls: ['./teclado.component.css']
})
export class TecladoComponent implements OnInit {

    letra: string;
    color: string;
    asigna_Color: string;
    contadorLetras: number = 0;
    letrasPulsadas: string[] = [];
    


    constructor(public servicio_com: TecladoService) {
        this.letra = '';
        this.color = '';
        this.asigna_Color = '';

    }

    ngOnInit(): void {

    }

    tecla(btn: string) {
        console.log("El boton pulsado: " + btn);
        this.addLetraArray(btn);
        this.servicio_com.informaTeclaPulsada(btn);
    }

    addLetraArray(btn: string) {

        let btnPulsada = btn;

        if ((btnPulsada != "ENVIAR") && (btnPulsada != "BORRAR")) {
            console.log("letra pulsada: " + btnPulsada);
            if (this.letrasPulsadas.length < 5) {
                this.letrasPulsadas.push(btnPulsada);
                console.log(this.letrasPulsadas);
            }
        } else if (btnPulsada == "BORRAR") {
            this.letrasPulsadas.pop();
            console.log(this.letrasPulsadas);
        }

    }





    //INFORMO AL SERVICIO QUE HAY UNA NUEVA LETRA
    /*teclaPulsada(event: Event) {
    //let boton = document.getElementById(btn);
    //console.log("----- " + boton?.id);
    let botonTocado: HTMLButtonElement = <HTMLButtonElement> event.target;
    console.log("BOTON TOCADO " + botonTocado.id);
    this.servicio_com.informaTeclaPulsada(botonTocado.id);
    //console.log("pulsada: " + boton?.id);
    }
    */


    getColor(color: string) {
        switch (color) {
            case 'acierto_posicion_correcta':
                return '#0D5F5A';
            case 'acierto_posicion_no_correcta':
                return '#F6A942';
            case 'fallo':
                return '#545454';
            default:
                return '#EFEADD';
        }
    }

    botonPintar() {
        let estado_partida: any =

        {
            "resultadoPartida": {
                "resultado": "2",
                "fecha_inicio": 11434394903000,
                "fecha_fin": 11434395323000,
                "intentos": [
                    {
                        "palabra": "HELIO",
                        "letra1": 1,
                        "letra2": -1,
                        "letra3": 0,
                        "letra4": 0,
                        "letra5": 1
                    },
                    {
                        "palabra": "QWSRT",
                        "letra1": 1,
                        "letra2": 0,
                        "letra3": -1,
                        "letra4": 1,
                        "letra5": 0
                    },
                    {
                        "palabra": "JOTAS",
                        "letra1": 1,
                        "letra2": 0,
                        "letra3": -1,
                        "letra4": 1,
                        "letra5": 0
                    }
                ]
            }

        }
        this.actualizarTeclado(estado_partida);
    }

    actualizarTeclado(estado_partida: any) {
        console.log(estado_partida);
        //console.log(estado_partida.resultadoPartida.intentos[0].letra2);
        // console.log(estado_partida.resultadoPartida.intentos[0].palabra[2]);

        let ultimoIntento: number = estado_partida.resultadoPartida.intentos.length - 1;
        console.log(ultimoIntento);

        let ultima_palabra: string = estado_partida.resultadoPartida.intentos[ultimoIntento].palabra;
        console.log(ultima_palabra);

        let letra_aux: string;

        for (let i = 0; i < 5; i++) {
            console.log(ultima_palabra.charAt(i));
            letra_aux = ultima_palabra.charAt(i);
            let boton: HTMLButtonElement = <HTMLButtonElement>document.getElementById(letra_aux);
            let estado!: number;
            switch (i) {
                case 0:
                    estado = estado_partida.resultadoPartida.intentos[ultimoIntento].letra1;
                    break;
                case 1:
                    estado = estado_partida.resultadoPartida.intentos[ultimoIntento].letra2;
                    break;
                case 2:
                    estado = estado_partida.resultadoPartida.intentos[ultimoIntento].letra3;
                    break;
                case 3:
                    estado = estado_partida.resultadoPartida.intentos[ultimoIntento].letra4;
                    break;
                case 4:
                    estado = estado_partida.resultadoPartida.intentos[ultimoIntento].letra5;
                    break;

            }

            if (boton.style.backgroundColor != '#0D5F5A') {
                switch (estado) {
                    case 0:
                        boton.style.backgroundColor = '#545454';
                        boton.style.color = '#FBF7F0';
                        break;

                    case 1:
                        boton.style.backgroundColor = '#0D5F5A';
                        boton.style.color = '#FBF7F0';
                        break;

                    case -1:
                        boton.style.backgroundColor = '#F6A942';
                        boton.style.color = '#FBF7F0';
                        break;
                }
            }


        }

        /*for (let i=0; i<estado_partida.resultadoPartida.intentos.length; i++){
        console.log("palabra : " + estado_partida.resultadoPartida.intentos[i].palabra)
        ;
        }
        for (let i=1; i<5; i++){
        console.log("letra : " + estado_partida.resultadoPartida.intentos[i].letra[String(i)]);
        }*/


    }



}
