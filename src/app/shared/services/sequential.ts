import { HttpResponse } from '@angular/common/http';
import { Observable, Observer, Subscription } from 'rxjs';
import { HttpService } from './http';
import { isPresent } from '../common';
import * as _ from 'underscore';
import { Word } from './model';

export class SequentialBatchRequest {
  public responses: HttpResponse<any>[] = [];
  private currentIndex = 0;
  private subscription: Subscription = new Subscription();
  private observer: Observer<Word>;
  private httpService: HttpService;
  private consumed = false;

  constructor(private requests: Word[]) {}

  public transmitOn(tradingService: HttpService): Observable<Word> {
    if (this.consumed === true) {
      throw Error('You cannot use the same instance more than once.');
    }
    this.consumed = true;
    return new Observable<Word>((observer) => {
      if (!isPresent(this.requests) || this.requests.length === 0) {
        observer.complete();
        return;
      }
      this.observer = observer;
      this.httpService = tradingService;
      this.sendReq();
    });
  }

  private onResponse(dataEvent: any): void {
    this.responses.push(dataEvent);
    this.currentIndex++;
    if (this.currentIndex < this.requests.length) {
      this.sendReq();
    } else {
      this.observer.complete();
      this.subscription.unsubscribe();
    }
  }

  private sendReq(): void {
    const req = this.requests[this.currentIndex];
    this.observer.next(req);
    this.httpService.delete(req).subscribe((value) => {
      this.onResponse(value);
    });
  }
}
