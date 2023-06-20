import { NgModule } from '@angular/core';
import { HomeComponent } from './component';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [HomeComponent],
  imports: [NbButtonModule],
  exports: [HomeComponent],
})
export class HomeModule {}
