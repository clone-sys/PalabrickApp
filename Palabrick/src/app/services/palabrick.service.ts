import { Injectable } from '@angular/core';
import { DatoEstadistica } from '../classes/datoEstadistica';


/*
Servicios de guardado de estadisticas
variable en el localstorage: "palabrick_resultados"
Métodos: 
-obtener
-guardar
*/


@Injectable({
  providedIn: 'root'
})
export class PalabrickService {

  readonly LOCALS_HISTORICO_DATOS_COMPLETO = "palabrick_historico_datos_completo";

  constructor() { 
  
   }


   obtenerDatosHistoricosCompletos():Array<DatoEstadistica> | null{
    let array_resultado2: Array<DatoEstadistica> | null ;
    let array_resultado: string | null = localStorage.getItem(this.LOCALS_HISTORICO_DATOS_COMPLETO)
    

    if (array_resultado != null) {
     array_resultado2 = JSON.parse(array_resultado);
    }else{
      array_resultado2=null;
    }
    
    return array_resultado2;
   }



   guardarDatosHistoricosCompletos(array_datos:Array<DatoEstadistica>):void{
    localStorage.setItem(this.LOCALS_HISTORICO_DATOS_COMPLETO, JSON.stringify(array_datos));
    console.log("->guardado")
    console.log(JSON.stringify(array_datos));
   }

}
