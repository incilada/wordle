import { NgModule } from '@angular/core';
import { NbButtonModule, NbInputModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NewWordComponent } from './component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewWordComponent],
  imports: [CommonModule, FormsModule, NbButtonModule, NbInputModule],
  exports: [NewWordComponent],
})
export class NewWordModule {}
