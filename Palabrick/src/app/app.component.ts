import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToolbarOptions } from './classes/toolbar-options';
import { ToolbarOptionsService } from './services/toolbar-options.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  ToolbarOptionsService_subscription: Subscription;
  newToolbarOptions: ToolbarOptions;
  
  public gamePages = [
    { name: 'game', title: 'Juego', url: '/juego', icon: 'game-controller', showToolbar: false },
    { name: 'lastGame', title: 'Resultado última partida', url: '/resultadoPartida', icon: 'trophy', showToolbar: false },
    { name: 'statistics', title: 'Estadísticas', url: '/estadisticas', icon: 'stats-chart', showToolbar: false },
    { name: 'share', title: 'Compartir', url: '/compartir', icon: 'share-social', showToolbar: false }
  ];

  public miscPages = [
    { name: 'help', title: 'Ayuda', url: '/ayuda', icon: 'help-circle', showToolbar: true },
    { name: 'credits', title: 'Créditos', url: '/creditos', icon: 'newspaper', showToolbar: false },
    { name: 'settings', title: 'Ajustes', url: '/ajustes', icon: 'cog', showToolbar: true }
  ];

  constructor(public ToolbarOptionsService:ToolbarOptionsService) {
    this.ToolbarOptionsService_subscription = this.ToolbarOptionsService.newToolbarOptions.subscribe(
      toolbarOptions => {
        console.log("Nueva configuración de la barra superior" + toolbarOptions);
        this.newToolbarOptions = toolbarOptions;
        Object.keys(toolbarOptions).forEach(keyTO => {
          Object.keys(this.gamePages).forEach(keyGP => {
            if( this.gamePages[keyGP].name == keyTO ) {
              //console.log('Actualizando la setting ' + this.gamePages[keyGP].name + ' de ' + this.gamePages[keyGP].showToolbar + ' a ' + toolbarOptions[keyTO]);
              this.gamePages[keyGP].showToolbar = toolbarOptions[keyTO];
            }
          });

          Object.keys(this.miscPages).forEach(keyMP => {
            if( this.miscPages[keyMP].name == keyTO ) {
              //console.log('Actualizando la setting ' + this.miscPages[keyMP].name + ' de ' + this.miscPages[keyMP].showToolbar + ' a ' + toolbarOptions[keyTO]);
              this.miscPages[keyMP].showToolbar = toolbarOptions[keyTO];
            }
          });
        });
    });
  }
}
