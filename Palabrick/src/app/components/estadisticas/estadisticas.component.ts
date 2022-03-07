import { Component, OnInit } from '@angular/core';
import { ToolbarOptions } from 'src/app/classes/toolbar-options';
import { ToolbarOptionsService } from 'src/app/services/toolbar-options.service';

import { DatoEstadistica } from 'src/app/classes/datoEstadistica';
import { PalabrickService } from '../../services/palabrick.service';



@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  
  // Propiedades ==================================================
  test_resultado: DatoEstadistica | null;
  test_input: number | null = 1;
  input_partida: DatoEstadistica | null;


  toolbarOptions: ToolbarOptions;


   /*
  variables de estadistica historico
  */

  historico_array_datos_bruto: Array<DatoEstadistica> | null;
  //historico_partidas_totales: number | null;
  historico_array_seis_rondas_y_errores: Array<number>;
  historico_array_seis_rondas_y_errores_porcentajes: Array<number>;
  historico_array_seis_rondas_y_errores_porcentajes_pintar: Array<number>;
  historico_partidas_totales: number;
  historico_porcentaje_aciertos: number;


  // Métodos ==================================================

  constructor(public ToolbarOptionsService:ToolbarOptionsService,public servicio_palabrick: PalabrickService) {
    this.toolbarOptions = new ToolbarOptions();
    this.toolbarOptions.game = true;
    this.toolbarOptions.lastGame = true;
    this.toolbarOptions.statistics = false;
    this.toolbarOptions.share = true;
    this.toolbarOptions.help = false;
    this.toolbarOptions.credits = true;
    this.toolbarOptions.settings = true;


    this.historico_partidas_totales = 0;
    this.historico_array_datos_bruto = null;
    this.test_resultado = null;
    this.input_partida = null;
    this.historico_porcentaje_aciertos=0;
   
    /*
    variables de estadistica historica
    */
    this.historico_array_seis_rondas_y_errores = [0, 0, 0, 0, 0, 0, 0];
    this.historico_array_seis_rondas_y_errores_porcentajes = [0, 0, 0, 0, 0, 0, 0];
    this.historico_array_seis_rondas_y_errores_porcentajes_pintar=[0, 0, 0, 0, 0, 0, 0];
  }

  ngOnInit() {
    this.ToolbarOptionsService.changeToolbarOptions(this.toolbarOptions);


    //this.input_partida = this.testDatoResultado();
    this.input_partida = this.testDatoResultado()

    this.guardarDatosHistoricosCompletos(this.input_partida);
      //guardamos los datos nuevos si la partida acaba de terminar
      
      
      //calcular historicos
      this.calcularHistoricos();
  
  console.log("ooooooo")
      console.log(this.input_partida)

  }



  guardarDatosHistoricosCompletos(resultado: DatoEstadistica) {

    //obtenemos array
    this.historico_array_datos_bruto = this.obtenerDatosHistoricos();
   // let dato: DatoEstadistica = this.testDatoResultado();
    //sumamos
    if (this.historico_array_datos_bruto == null) {
      this.historico_array_datos_bruto = new Array;
    }

    this.historico_array_datos_bruto.push(resultado);

    //guardamos
    this.servicio_palabrick.guardarDatosHistoricosCompletos(this.historico_array_datos_bruto);

  }



  obtenerDatosHistoricos(): Array<DatoEstadistica> | null {
    let respuesta: Array<DatoEstadistica> | null;
    respuesta = this.servicio_palabrick.obtenerDatosHistoricosCompletos();
    return respuesta;
  }


  calcularHistoricos() {
    // this.historico_array_seis_rondas_y_errores
    // recorrer array historicos y sumar aciertos en 1a, 2a...
    if (this.historico_array_datos_bruto != null) {

      for (let partida of this.historico_array_datos_bruto) {

          console.log("partida usuario>> "+partida.resultado)


          switch (partida.resultado) {

            case 1:
              this.historico_array_seis_rondas_y_errores[0] += 1;           
              console.log("#1")
              break;

            case 2:
              this.historico_array_seis_rondas_y_errores[1] += 1;
           //   this.historico_array_seis_rondas_y_errores[0] += 1;
              console.log("#2")
              break;

            case 3:
             // console.log("---->---->")
             this.historico_array_seis_rondas_y_errores[2] += 1;
            //  this.historico_array_seis_rondas_y_errores[3] += 1;
             // console.log(this.historico_array_seis_rondas_y_errores[3]);
              break;

            case 4:
              this.historico_array_seis_rondas_y_errores[3] +=1;
              break;

            case 5:
              this.historico_array_seis_rondas_y_errores[4] += 1;
              break;

            case 6:
              this.historico_array_seis_rondas_y_errores[5] += 1;
              break;

              case 7:
                this.historico_array_seis_rondas_y_errores[6] += 1;
                break;

          } //switch

        } //for

      }  //if


      this.calcularPartidasTotales()
      this.calcularPorcentajes_rondas()
      this.calcular_porcentaje_aciertos_total();

      console.log("----"+this.historico_array_seis_rondas_y_errores[0]);
    }
  

    calcularPartidasTotales():void{
      for (let ronda of this.historico_array_seis_rondas_y_errores) {
        this.historico_partidas_totales +=  ronda;
       }
    }


    calcularPorcentajes_rondas():void{
      let i: number = 0;
          for (let ronda of this.historico_array_seis_rondas_y_errores) {   

              this.historico_array_seis_rondas_y_errores_porcentajes[i]= Math.round((ronda*100)/this.historico_partidas_totales); 
              this.historico_array_seis_rondas_y_errores_porcentajes_pintar[i]= Math.round(this.historico_array_seis_rondas_y_errores_porcentajes[i]/3);
              
              console.log( "porcierto de la ronda  "+i)
              console.log( this.historico_array_seis_rondas_y_errores_porcentajes[i])
              i++;          
          }
    }

    calcular_porcentaje_aciertos_total(){

this.historico_porcentaje_aciertos = Math.round(((this.historico_partidas_totales-this.historico_array_seis_rondas_y_errores[0])*100)/this.historico_partidas_totales)

//Math.round((((this.historico_partidas_totales) - (this.historico_array_seis_rondas_y_errores_porcentajes[0]))*10)/this.historico_partidas_totales); 
console.log(this.historico_array_seis_rondas_y_errores_porcentajes[0] );
    }


  /**********************
 ******************  TEST
 ************************/




  // simulando que es un dato en el input
  testDatoResultado(): DatoEstadistica {
    let boleo:number= Math.round(Math.random() * (7 - 1) + 1);
//boleo= 3;
    let fecha: Date | number;
    fecha = Date.now();
    let devuelve: DatoEstadistica =
    {
      "resultado_palabra":"PAPEL",
      "resultado": boleo,
      "fecha_inicio": fecha,
      "fecha_fin": 1645703592,
      "intentos": [
        {
          "palabra": "PAPEL",
          "letra1": 1,
          "letra2": -1,
          "letra3": 0,
          "letra4": 0,
          "letra5": 1
        },
        {
          "palabra": "PAPEL",
          "letra1": 0,
          "letra2": -1,
          "letra3": 1,
          "letra4": 0,
          "letra5": 1
        },
        {
          "palabra": "PADEL",
          "letra1": 1,
          "letra2": 1,
          "letra3": 1,
          "letra4": 1,
          "letra5": 1
        }
      ]
    }

    return devuelve;
  }


}