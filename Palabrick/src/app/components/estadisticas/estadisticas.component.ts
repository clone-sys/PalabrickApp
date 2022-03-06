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


  // Métodos ==================================================

  constructor(public ToolbarOptionsService:ToolbarOptionsService) {
    this.toolbarOptions = new ToolbarOptions();
    this.toolbarOptions.game = true;
    this.toolbarOptions.lastGame = true;
    this.toolbarOptions.statistics = false;
    this.toolbarOptions.share = true;
    this.toolbarOptions.help = false;
    this.toolbarOptions.credits = true;
    this.toolbarOptions.settings = true;
  }

  ngOnInit() {
    this.ToolbarOptionsService.changeToolbarOptions(this.toolbarOptions);
  }
}