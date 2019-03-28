import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FotosComponent } from './pages/fotos/fotos.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'fotos', component: FotosComponent },
  { path: 'sobre', component: SobreComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
