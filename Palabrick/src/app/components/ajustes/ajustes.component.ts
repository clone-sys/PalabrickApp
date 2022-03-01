import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
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

  constructor(public toolbarOptionsService: ToolbarOptionsService, public settingsService: SettingsService) {
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
    this.toolbarOptionsService.changeToolbarOptions(this.toolbarOptions);
    this.settingsService.changeOptions(this.settingsOption);
  }
}
