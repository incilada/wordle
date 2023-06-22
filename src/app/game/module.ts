import { NgModule } from '@angular/core';
import { GameComponent } from './component';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WordleModule } from '../games/wordle/module';

@NgModule({
  declarations: [GameComponent],
  imports: [
    FormsModule,
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    WordleModule,
  ],
  exports: [GameComponent],
})
export class GameModule {}
