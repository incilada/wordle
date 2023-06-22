import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {
  NbContextMenuModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarService,
  NbThemeModule,
  NbWindowModule,
  NbWindowService,
} from '@nebular/theme';
import { AboutModule } from './about/module';
import { HomeModule } from './home/module';
import { SettingsModule } from './settings/module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { WordListService } from './shared/services/word-list';
import { HttpClientModule } from '@angular/common/http';
import { WordListModule } from './word-list/module';
import { HttpService } from './shared/services/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { GlobalConstantsToken } from './shared/token';
import { GlobalConstants } from './shared/global-constants';
import { GamesModule } from './games/module';
import { GameModule } from './game/module';
import { MainModule } from './main/module';
import { GameService } from './shared/services/game';
@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    AboutModule,
    WordListModule,
    GamesModule,
    HomeModule,
    GameModule,
    MainModule,
    SettingsModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbWindowModule.forRoot(),
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbEvaIconsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    { provide: GlobalConstantsToken, useClass: GlobalConstants },
    HttpService,
    NbSidebarService,
    WordListService,
    NbWindowService,
    GameService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
