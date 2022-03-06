import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicadorService {

  //"EMISOR"
  private letraPulsadaSource = new Subject<string>();
  teclaPulsada = this.letraPulsadaSource.asObservable();

  constructor() { }

  //"EMISI脫N DEL EVENTO"
  informaTeclaPulsada(tecla: string) {
    this.letraPulsadaSource.next(tecla);
  }
}
