import { isDevMode } from '@angular/core';

//  Uygulama genelinde neredeyse 1000lerce kez kullanacağımız
//  sadece aşağıdaki 2 fonksiyon burada yer alacak.

/**
 *  Null-check
 */
export function isPresent(obj: any): boolean {
  return obj !== undefined && typeof obj !== 'undefined' && obj !== null;
}

export function consoleLog(message?: any, ...optionalParams: any[]): void {
  if (isPresent(console) && isDevMode()) {
    console.log(message, ...optionalParams);
  }
}
