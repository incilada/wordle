import { Injectable } from '@angular/core';

export interface IGlobalConstants {
  projectName: string;
}

@Injectable()
export class GlobalConstants implements IGlobalConstants {
  projectName = 'Game Area';
}
