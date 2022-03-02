import { Component, OnInit } from '@angular/core';
import StorageService from 'src/app/services/storage.service';
import { ToolbarOptions } from 'src/app/services/toolbar-options';
import { ToolbarOptionsService } from 'src/app/services/toolbar-options.service';
import { Settings } from 'src/app/settings';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {

  // Propiedades ==================================================

  toolbarOptions: ToolbarOptions;
  // Settings
  settingsOption: Settings;
  // Métodos ==================================================

  constructor(public toolbarOptionsService: ToolbarOptionsService, public storageService: StorageService) {
    this.toolbarOptions = new ToolbarOptions();
    this.toolbarOptions.game = true;
    this.toolbarOptions.lastGame = true;
    this.toolbarOptions.statistics = true;
    this.toolbarOptions.share = true;
    this.toolbarOptions.help = false;
    this.toolbarOptions.credits = true;
    this.toolbarOptions.settings = false;
    this.settingsOption = new Settings();
  }
  ngOnInit() {
    this.storageService.getAjustes()
  }
  saveSettings(){
    console.log("Guardar cambios");
    this.storageService.guardarAjustes(this.settingsOption);
  }
}
