import { NgModule } from '@angular/core';
import { GameComponent } from './component';
import { NbButtonModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { GameResultModule } from '../shared/components/game-result/module';

@NgModule({
  declarations: [GameComponent],
  imports: [CommonModule, NbButtonModule, GameResultModule],
  exports: [GameComponent],
})
export class GameModule {}
