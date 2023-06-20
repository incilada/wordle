import { NgModule } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { GameResultComponent } from './component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GameResultComponent],
  imports: [CommonModule, FormsModule, NbButtonModule],
  exports: [GameResultComponent],
})
export class GameResultModule {}
