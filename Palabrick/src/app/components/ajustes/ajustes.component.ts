import { Component, OnInit } from '@angular/core';
import { ToolbarOptions } from 'src/app/services/toolbar-options';
import { ToolbarOptionsService } from 'src/app/services/toolbar-options.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {

  // Propiedades ==================================================

  toolbarOptions: ToolbarOptions;


  // Métodos ==================================================

  constructor(public toolbarOptionsService: ToolbarOptionsService) {
    this.toolbarOptions = new ToolbarOptions();
    this.toolbarOptions.game = true;
    this.toolbarOptions.lastGame = true;
    this.toolbarOptions.statistics = true;
    this.toolbarOptions.share = true;
    this.toolbarOptions.help = false;
    this.toolbarOptions.credits = true;
    this.toolbarOptions.settings = false;
  }

  ngOnInit() {
    this.toolbarOptionsService.changeToolbarOptions(this.toolbarOptions);
  }
}
