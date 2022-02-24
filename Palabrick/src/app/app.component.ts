import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public gamePages = [
    { title: 'Juego', url: '/juego', icon: 'game-controller', showToolbar: false  },
    { title: 'Resultado última partida', url: '/resultadoPartida', icon: 'trophy', showToolbar: false  },
    { title: 'Estadísticas', url: '/estadisticas', icon: 'stats-chart', showToolbar: false  }
  ];

  public miscPages = [
    { title: 'Ayuda', url: '/ayuda', icon: 'help-circle', showToolbar: true },
    { title: 'Créditos', url: '/creditos', icon: 'newspaper', showToolbar: false },
    { title: 'Ajustes', url: '/ajustes', icon: 'cog', showToolbar: true }
  ];

  constructor() {}
}
