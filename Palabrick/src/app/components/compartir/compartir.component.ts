import { Component, OnInit } from '@angular/core';
import { ToolbarOptions } from 'src/app/services/toolbar-options';
import { ToolbarOptionsService } from 'src/app/services/toolbar-options.service';

@Component({
  selector: 'app-compartir',
  templateUrl: './compartir.component.html',
  styleUrls: ['./compartir.component.scss'],
})
export class CompartirComponent implements OnInit {

  // Propiedades ==================================================

  toolbarOptions: ToolbarOptions;


  // Métodos ==================================================

  constructor(public ToolbarOptionsService:ToolbarOptionsService) {
    this.toolbarOptions = new ToolbarOptions();
    this.toolbarOptions.game = true;
    this.toolbarOptions.lastGame = true;
    this.toolbarOptions.statistics = true;
    this.toolbarOptions.share = false;
    this.toolbarOptions.help = false;
    this.toolbarOptions.credits = true;
    this.toolbarOptions.settings = true;
  }

  ngOnInit() {
    this.ToolbarOptionsService.changeToolbarOptions(this.toolbarOptions);
  }
}