import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AyudaComponent } from './ayuda/ayuda.component';
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: 'home', component:HomePage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },{
    path: 'ayuda', component:AyudaComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
