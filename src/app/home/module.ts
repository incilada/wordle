import { NgModule } from '@angular/core';
import { HomeComponent } from './component';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameModule } from '../game/module';
import { MainModule } from '../main/module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    FormsModule,
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    GameModule,
    MainModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
