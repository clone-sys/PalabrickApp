export class DatoEstadistica {
    resultado_palabra: string | null;
    resultado:	number | null;
    fecha_inicio: Date | number |null;
    fecha_fin: Date | number | null;
    intentos: Array<any>;

       
    
constructor(resultado:string){
    this.resultado_palabra=  "";
    this.fecha_inicio=  null;
    this.fecha_fin=  null;
    this.resultado= null;   
    this.intentos=[];
}


}
