import { NgModule } from '@angular/core';
import { WordleModule } from './wordle/module';

const components = [WordleModule];
@NgModule({
  declarations: [],
  imports: [components],
  exports: [components],
})
export class GamesModule {}
