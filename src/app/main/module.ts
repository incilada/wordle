import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    FormsModule,
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
