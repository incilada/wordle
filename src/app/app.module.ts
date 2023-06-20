import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {
  NbActionsModule,
  NbButtonModule,
  NbContextMenuModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbSidebarService,
  NbThemeModule,
  NbWindowModule,
  NbWindowService,
} from '@nebular/theme';
import { AboutModule } from './about/module';
import { GameModule } from './game/module';
import { HomeModule } from './home/module';
import { SettingsModule } from './settings/module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { WordListService } from './shared/services/word-list';
import { HttpClientModule } from '@angular/common/http';
import { WordListModule } from './word-list/module';
import { HttpService } from './shared/services/http';
import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    AboutModule,
    WordListModule,
    GameModule,
    HomeModule,
    SettingsModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbWindowModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbEvaIconsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [HttpService, NbSidebarService, WordListService, NbWindowService],
  bootstrap: [AppComponent],
})
export class AppModule {}
