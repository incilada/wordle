import { NgModule } from '@angular/core';
import { SettingsComponent } from './component';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [SettingsComponent],
  imports: [NbButtonModule],
  exports: [SettingsComponent],
})
export class SettingsModule {}
