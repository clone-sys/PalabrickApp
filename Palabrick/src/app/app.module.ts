import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JuegoComponent } from './components/juego/juego.component';
import { ResultadoPartidaComponent } from './components/resultado-partida/resultado-partida.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { CreditosComponent } from './components/creditos/creditos.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { TableroComponent } from './components/juego/tablero/tablero.component';
import { TecladoComponent } from './components/juego/teclado/teclado.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent,
    TableroComponent,
    TecladoComponent,
    ResultadoPartidaComponent,
    EstadisticasComponent,
    AyudaComponent,
    CreditosComponent,
    AjustesComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot({
    name: '__mydb'
    ,driverOrder: [Drivers.SecureStorage, Drivers.IndexedDB, Drivers.LocalStorage]
  }),AppRoutingModule,HttpClientModule,FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
