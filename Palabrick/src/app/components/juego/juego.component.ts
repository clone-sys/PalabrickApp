import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Partida } from 'src/app/classes/partida';
import { ToolbarOptions } from 'src/app/classes/toolbar-options';
import { PalabrasService } from 'src/app/services/palabras.service';
import { TecladoService } from 'src/app/services/teclado.service';
import { ToolbarOptionsService } from 'src/app/services/toolbar-options.service';
import { TableroComponent } from './tablero/tablero.component';
import { TecladoComponent } from './teclado/teclado.component';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
})
export class JuegoComponent implements OnInit {

  // Propiedades ==================================================

  TecladoService_subscription: Subscription;

  toolbarOptions: ToolbarOptions;
  partidaEnCurso: Partida;
  partidaEnCurso_json: string;
  palabra: string;
  tecla: string;
  palabraInput: string;
  teclado_linea1: string[];
  teclado_linea2: string[];
  teclado_linea3: string[];


  // Métodos ==================================================

  constructor(public ToolbarOptionsService:ToolbarOptionsService, public PalabrasService:PalabrasService, public TecladoService:TecladoService) {
    this.toolbarOptions = new ToolbarOptions();
    this.toolbarOptions.game = false;
    this.toolbarOptions.lastGame = true;
    this.toolbarOptions.statistics = true;
    this.toolbarOptions.share = true;
    this.toolbarOptions.help = true;
    this.toolbarOptions.credits = true;
    this.toolbarOptions.settings = true;
    
    this.partidaEnCurso = new Partida();
    this.palabra = '';
    this.tecla = 'A';
    this.palabraInput = '';

    this.teclado_linea1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    this.teclado_linea2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
    this.teclado_linea3 = ['ENVIAR', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '«'];

    this.TecladoService_subscription = this.TecladoService.nuevaTeclaPulsada.subscribe(
      teclaPulsada => {
        this.procesarTecla(teclaPulsada);
    });
  }


  ngOnInit() {
    this.ToolbarOptionsService.changeToolbarOptions(this.toolbarOptions);
    console.log(this.partidaEnCurso);
    this.recuperarPartidaDeStorage('partidaEnCurso');
    console.log(this.partidaEnCurso);
    console.log(localStorage.getItem('AlgoQueNoExiste')===null);
  }


  pulsarTecla(event) {
    let teclita = event.target;
    console.log(teclita.firstChild.textContent);
  }


  enviarPalabra() {

  }


  procesarTecla(tecla: string) {
    console.log('tecla: ' + tecla);

    if( tecla == 'ENVIAR' ) {
 
    }

    const pattern = /[a-zA-Z]/;
    const ultimaTeclaPulsada = tecla.substr(tecla.length - 1);
    console.log('ultimaTeclaPulsada: ' + ultimaTeclaPulsada);

    if (!pattern.test(ultimaTeclaPulsada)) {    
        // invalid character, prevent input
        console.error('"' + ultimaTeclaPulsada + '" NO se acepta. Vacío el campo');
        console.log('this.palabraInput: ' + this.palabraInput);
    }
    else {
      console.error('"' + ultimaTeclaPulsada + '" SÍ se acepta. Vacío el campo y proceso la palabra');
      this.palabraInput = this.palabraInput.toUpperCase();
      console.log('this.palabraInput: ' + this.palabraInput);
    }
  }


  guardarPartidaEnStorage(tipoPartida: string) {
    if( tipoPartida == 'partidaEnCurso' || tipoPartida == 'ultimaPartida' ) {
      if( tipoPartida == 'partidaEnCurso' ) { console.log('Guardando evolución de la partida para poder recuperarlo si sale del juego => Utilizar el servicio de Manolo para guardar en el "Storage" que proceda'); }
      if( tipoPartida == 'ultimaPartida' ) { console.log('Guardando resultado de la última partida finalizada => Utilizar el servicio de Manolo para guardar en el "Storage" que proceda'); }

      this.partidaEnCurso_json = JSON.stringify(this.partidaEnCurso);

      localStorage.setItem(tipoPartida, this.partidaEnCurso_json);
    }
    else {
        console.error('El tipo de partida "' + tipoPartida + '" a guardar no es correcto');
    }
  }


  recuperarPartidaDeStorage(tipoPartida: string) {
    if( tipoPartida == 'partidaEnCurso' || tipoPartida == 'ultimaPartida' ) {
      if( tipoPartida == 'partidaEnCurso' ) { console.log('Recuperando evolución de la partida para poder recuperarlo si sale del juego => Utilizar el servicio de Manolo para guardar en el "Storage" que proceda'); }
      if( tipoPartida == 'ultimaPartida' ) { console.log('Recuperando resultado de la última partida finalizada => Utilizar el servicio de Manolo para guardar en el "Storage" que proceda'); }
      
      this.partidaEnCurso_json = localStorage.getItem(tipoPartida);

      if( this.partidaEnCurso_json !== null ) {
        console.log('Hay partida. La recupero');
        this.partidaEnCurso.cargarDesdeArrayJSON(this.partidaEnCurso_json);
      }
      else {
        console.log('No hay partida, se utiliza la vacía');
      }
    }
    else {
        console.error('El tipo de partida "' + tipoPartida + '" a recuperar no es correcto');
    }
  }
}