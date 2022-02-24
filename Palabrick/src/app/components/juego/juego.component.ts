import { Component, OnInit } from '@angular/core';
import { TableroComponent } from './tablero/tablero.component';
import { TecladoComponent } from './teclado/teclado.component';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
})
export class JuegoComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
