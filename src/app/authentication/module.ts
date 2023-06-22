import { NgModule } from '@angular/core';
import { LoginComponent } from './login/component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [FormsModule, CommonModule],
  exports: [LoginComponent],
})
export class AuthenticationModule {}
