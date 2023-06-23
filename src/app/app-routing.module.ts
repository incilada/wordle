import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/component';
import { SettingsComponent } from './settings/component';
import { AboutComponent } from './about/component';
import { WordListComponent } from './word-list/component';
import { LoginComponent } from './authentication/login/component';

export enum Path {
  Home = 'home',
  Settings = 'settings',
  About = 'about',
  WordList = 'word-list',
}

const routes: Routes = [
  {
    path: Path.Home,
    component: HomeComponent,
  },
  {
    path: Path.Settings,
    component: SettingsComponent,
  },
  {
    path: Path.About,
    component: AboutComponent,
  },
  {
    path: Path.WordList,
    component: WordListComponent,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'prefix',
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
