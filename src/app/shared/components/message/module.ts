import { NgModule } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule, FormsModule, NbButtonModule],
  exports: [MessageComponent],
})
export class MessageModule {}
