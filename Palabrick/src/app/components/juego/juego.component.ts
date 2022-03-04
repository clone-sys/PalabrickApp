import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Partida } from 'src/app/classes/partida';
import { ToolbarOptions } from 'src/app/classes/toolbar-options';
import { PalabrasService } from 'src/app/services/palabras.service';
import { TecladoService } from 'src/app/services/teclado.service';
import { ToolbarOptionsService } from 'src/app/services/toolbar-options.service';
import { TableroComponent } from './tablero/tablero.component';
import { TecladoComponent } from './teclado/teclado.component';
import { IntentoPartida } from 'src/app/classes/intento-partida';

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
  teclado_linea1: string[];
  teclado_linea2: string[];
  teclado_linea3: string[];

  @ViewChild(TableroComponent) tablero:TableroComponent;


  // Métodos ==================================================

  constructor(public ToolbarOptionsService:ToolbarOptionsService, public PalabrasService:PalabrasService, public TecladoService:TecladoService, public toastController: ToastController) {
    this.toolbarOptions = new ToolbarOptions();
    this.toolbarOptions.game = false;
    this.toolbarOptions.lastGame = true;
    this.toolbarOptions.statistics = true;
    this.toolbarOptions.share = true;
    this.toolbarOptions.help = true;
    this.toolbarOptions.credits = true;
    this.toolbarOptions.settings = true;
    
    this.partidaEnCurso = new Partida();

    this.teclado_linea1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    this.teclado_linea2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
    this.teclado_linea3 = ['ENVIAR', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '«'];

    this.TecladoService_subscription = this.TecladoService.nuevaTeclaPulsada.subscribe(
      teclaPulsada => {
        //console.log('Desde el servicio se ha recibido una pulsación de la tecla ' + teclaPulsada);
        this.procesarTecla(teclaPulsada);
    });

    console.log('Juego Component Constructor');
    console.log(this.partidaEnCurso);
    this.recuperarPartidaDeStorage('partidaEnCurso');
    console.log(this.partidaEnCurso);
  }


  ngOnInit() {
    console.log('Actualizando Toolbar');
    this.ToolbarOptionsService.changeToolbarOptions(this.toolbarOptions);
    
    console.log(this.partidaEnCurso);
    this.recuperarPartidaDeStorage('partidaEnCurso');
    console.log(this.partidaEnCurso);
    
    console.log('Llamando a obtenerFicheroPalabras');
    this.PalabrasService.obtenerFicheroPalabras().then(() => {
      if( this.partidaEnCurso.palabra == '' ) {
        console.log('Llamando a obtenerPalabra');
        this.partidaEnCurso.palabra = this.PalabrasService.obtenerPalabra();
      }
      else {
        console.log('Forzando palabra');
        this.PalabrasService.forzarPalabra(this.partidaEnCurso.palabra);
      }

      this.guardarPartidaEnStorage('partidaEnCurso');
      console.log('this.partidaEnCurso.palabra: ' + this.partidaEnCurso.palabra);
      this.tablero.refrescarTablero();
    });
  }


  pulsarTecla(event) {
    let tecla = event.target.firstChild.textContent;
    //console.log(tecla);
    //this.procesarTecla(tecla);              // Pulsar tecla llamando directamente a función
    this.TecladoService.teclaPulsada(tecla);  // Pulsar tecla llamando al servicio
  }


  procesarTecla(tecla: string) {
    //console.log('tecla: ' + tecla);

    if( this.partidaEnCurso.fecha_fin != 0 ) {
      this.mostrarToast('La partida ya ha terminado');
    }
    else {
      let guardar = false;
      let intentoActual = this.partidaEnCurso.intentos[this.partidaEnCurso.intentos.length-1];
      let palabraActual = intentoActual.palabra;
      const pattern = /[a-zA-Z]/;

      if( tecla == 'ENVIAR' ) {
        console.log('Intentan enviar. La palabra actual tiene ' + palabraActual.length + ' letras');

        if( palabraActual.length == 5 ) {
          console.log('Tiene 5 letras. Realizo comprobaciones');
          
          console.log(this.PalabrasService.comprobarPalabra(palabraActual));
          if( !this.PalabrasService.comprobarPalabra(palabraActual) ) {
            this.mostrarToast('La palabra no existe en el listado de palabras disponibles');
          }
          else {
            console.log(this.PalabrasService.validarPalabra(palabraActual));
            let colores = this.PalabrasService.validarPalabra(palabraActual);

            console.log(this.partidaEnCurso.intentos);

            let intento: IntentoPartida = new IntentoPartida();

            intento.cargarIntento(intentoActual.palabra, colores[0], colores[1], colores[2], colores[3], colores[4]);
            this.partidaEnCurso.insertarIntento(intento, this.partidaEnCurso.intentos.length-1, true);
            console.log(this.partidaEnCurso.intentos);
            
            if( this.partidaEnCurso.fecha_fin == 0 && this.partidaEnCurso.intentos.length < 6 ) {
              intento = new IntentoPartida();
              this.partidaEnCurso.insertarIntento(intento, this.partidaEnCurso.intentos.length, false);
              console.log(this.partidaEnCurso.intentos);
            }
            
            console.log(this.partidaEnCurso.intentos);

            guardar = true;
          }

        }
        else {
          console.log('Faltan letras por introducir');
          this.mostrarToast('Faltan letras por introducir');
        }
      }
      else if( tecla == '«' ) {
        console.log('Intentan borrar la última letra. La palabra actual tiene ' + palabraActual.length + ' letras');

        if( palabraActual.length > 0 ) {
          console.log('Hay al menos una letra para borrar en la palabra actual');
          this.partidaEnCurso.intentos[this.partidaEnCurso.intentos.length-1].palabra = palabraActual.substring(0, palabraActual.length-1);
          guardar = true;
        }
        else {
          console.log('Nada que borrar');
          this.mostrarToast('No hay nada que borrar');
        }
      }
      else if( pattern.test(tecla) ) {
        console.log('"' + tecla + '" SÍ se acepta. Miro si la palabra aún acepta más letras, si es así añado la palabra.');
        
        if( this.partidaEnCurso.intentos[this.partidaEnCurso.intentos.length-1].palabra.length < 5 ) {
          console.log('Entraría la letra. La añado');
          this.partidaEnCurso.intentos[this.partidaEnCurso.intentos.length-1].palabra += tecla;
          guardar = true;
        }
        else {
          console.log('No entraría la letra. La ignoro');
          this.mostrarToast('La palabra ya tiene 5 letras')
        }
      }
      else {
        // invalid character, prevent input
        console.error('"' + tecla + '" NO se acepta. Aviso con un toast');
        this.mostrarToast('La tecla "' + tecla + '" no es válida.');
      }

      if( guardar ) {
        this.guardarPartidaEnStorage('partidaEnCurso');
        if( tecla == 'ENVIAR' ) { this.tablero.refrescarTablero(); }
        else                    { this.tablero.actualizaTablero(); }
      }
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
        this.guardarPartidaEnStorage('partidaEnCurso');
      }
    }
    else {
        console.error('El tipo de partida "' + tipoPartida + '" a recuperar no es correcto');
    }
  }


  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      icon: 'information-circle',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}