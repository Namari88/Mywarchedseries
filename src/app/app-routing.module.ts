import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WatchedListComponent } from './watched-list/watched-list.component';
import { HomeComponent } from './home/home.component';
import { NewSerieComponent } from './new-serie/new-serie.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'watched-list', component: WatchedListComponent },
  {path: 'new-serie', component: NewSerieComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
