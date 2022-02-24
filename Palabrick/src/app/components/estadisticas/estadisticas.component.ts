import { Component, OnInit } from '@angular/core';
import { ToolbarOptions } from 'src/app/services/toolbar-options';
import { ToolbarOptionsService } from 'src/app/services/toolbar-options.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {

  // Propiedades ==================================================

  toolbarOptions: ToolbarOptions;


  // Métodos ==================================================

  constructor(public ToolbarOptionsService:ToolbarOptionsService) {
    this.toolbarOptions = new ToolbarOptions();
    this.toolbarOptions.game = true;
    this.toolbarOptions.lastGame = true;
    this.toolbarOptions.statistics = false;
    this.toolbarOptions.help = false;
    this.toolbarOptions.credits = true;
    this.toolbarOptions.settings = true;
  }

  ngOnInit() {
    this.ToolbarOptionsService.changeToolbarOptions(this.toolbarOptions);
  }
}