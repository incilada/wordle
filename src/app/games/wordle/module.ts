import { NgModule } from '@angular/core';
import { WordleComponent } from './component';
import { NbButtonModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { GameResultModule } from '../../shared/components/game-result/module';

@NgModule({
  declarations: [WordleComponent],
  imports: [CommonModule, NbButtonModule, GameResultModule],
  exports: [WordleComponent],
})
export class WordleModule {}
