import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TecladoService {
  // Emisor
  private keyboardSource = new Subject<string>();
  newTeclaPulsada: Observable<string> = this.keyboardSource.asObservable();

  constructor() { }

  // Emisor del evento
  teclaPulsada(tecla: string) {
    this.keyboardSource.next(tecla);
  }
}