import { NgModule } from '@angular/core';
import { WordListComponent } from './component';
import { NbButtonModule, NbCheckboxModule, NbIconModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NewWordModule } from '../shared/components/new-word/module';
import { MessageModule } from '../shared/components/message/module';

@NgModule({
  declarations: [WordListComponent],
  imports: [
    CommonModule,
    NbButtonModule,
    NbIconModule,
    NewWordModule,
    NbCheckboxModule,
    MessageModule,
  ],
  exports: [WordListComponent],
})
export class WordListModule {}
