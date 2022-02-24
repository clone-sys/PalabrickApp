import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { CreditosComponent } from './components/creditos/creditos.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { JuegoComponent } from './components/juego/juego.component';
import { ResultadoPartidaComponent } from './components/resultado-partida/resultado-partida.component';

const routes: Routes = [
  { path: '', component: JuegoComponent, pathMatch: 'full' },
  { path: 'juego', component: JuegoComponent, pathMatch: 'full' },
  { path: 'resultadoPartida', component: ResultadoPartidaComponent, pathMatch: 'full' },
  { path: 'estadisticas', component: EstadisticasComponent, pathMatch: 'full' },
  { path: 'ayuda', component: AyudaComponent, pathMatch: 'full' },
  { path: 'creditos', component: CreditosComponent, pathMatch: 'full' },
  { path: 'ajustes', component: AjustesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
