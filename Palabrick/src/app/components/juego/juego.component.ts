import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Partida } from 'src/app/classes/partida';
import { ToolbarOptions } from 'src/app/classes/toolbar-options';
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


  // Métodos ==================================================

  constructor(public ToolbarOptionsService:ToolbarOptionsService, public TecladoService:TecladoService) {
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
    console.log('this.palabraInput: ' + this.palabraInput);
    const pattern = /[a-zA-Z]/;
    const inputValue = event.target.value;
    const ultimaTeclaPulsada = inputValue.substr(inputValue.length - 1);
    console.log('ultimaTeclaPulsada: ' + ultimaTeclaPulsada);

    if (!pattern.test(ultimaTeclaPulsada)) {    
        // invalid character, prevent input
        event.preventDefault();
        console.error('"' + ultimaTeclaPulsada + '" NO se acepta. Vacío el campo');
        //this.palabraInput = '';
        console.log('this.palabraInput: ' + this.palabraInput);
    }
    else {
      console.error('"' + ultimaTeclaPulsada + '" SÍ se acepta. Vacío el campo y proceso la palabra');
      this.palabraInput = this.palabraInput.toUpperCase();
      console.log('this.palabraInput: ' + this.palabraInput);
    }

    
    //inputElement.focus();
  }


  enviarPalabra() {

  }


  procesarTecla(tecla: string) {

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