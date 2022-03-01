import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TecladoService {
  // Emisor
  private tecladoSource = new Subject<string>();
  nuevaTeclaPulsada: Observable<string> = this.tecladoSource.asObservable();

  constructor() { }

  // Emisor del evento
  teclaPulsada(tecla: string) {
    this.tecladoSource.next(tecla);
  }
}