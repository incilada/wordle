import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { Word, WordResponse } from './model';
import { RandomHelper } from '../helper/random';
import * as _ from 'underscore';
import { isPresent } from '../common';
import { SequentialBatchRequest } from './sequential';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private wordList: Word[];
  private wordListAddress = 'assets/word-list.json';
  private newListAddress = 'assets/word-list2.json';
  private crudAddress = 'http://localhost:3000/words';

  constructor(private httpClient: HttpClient) {
    this.wordList = JSON.parse(localStorage.getItem('words'));
  }

  addAllWords(): void {
    this.httpClient.get(this.newListAddress).subscribe((wordList: any) => {
      for (const key in [4, 5, 6]) {
        const items = _.filter(
          wordList.words,
          (item) => item.title.length === key
        );
        this.sequentialPost(0, items, this.wordList);
      }
    });
  }

  private sequentialPost(index: number, wordList: any[], oldList: any): void {
    if (!isPresent(wordList[index])) {
      return;
    }
    const word = _.find(oldList, { title: wordList[index]['title'] });
    if (!isPresent(word)) {
      timer(100).subscribe(() => {
        this.post({
          id: RandomHelper.generateText(6),
          word: wordList[index]['title'],
        }).subscribe(() => {
          this.sequentialPost(++index, wordList, oldList);
        });
      });
    } else {
      this.sequentialPost(++index, wordList, oldList);
    }
  }

  get<T>(): Observable<T> {
    return this.httpClient.get<T>(this.wordListAddress);
  }

  post<T>(newWord: WordResponse): Observable<T> {
    const options: object = {
      responseType: 'json',
      observe: 'response',
    };
    return this.httpClient.post<T>(
      this.crudAddress,
      this.toReqArgs(newWord),
      options
    );
  }

  delete<T>(word: Word): Observable<T> {
    const id = _.where(this.wordList, { title: word.title })[0].id;
    return this.httpClient.delete<T>(this.crudAddress + '/' + id);
  }

  deleteAll(words: Word[]): Observable<boolean> {
    return new Observable((observer) => {
      const resp = [];
      const req = new SequentialBatchRequest(words);
      req.transmitOn(this).subscribe((value) => {
        resp.push(value);
        if (resp.length >= words.length) {
          observer.next(true);
          observer.complete();
        }
      });
    });
  }

  private toReqArgs(newWord: WordResponse): HttpParams {
    let params = new HttpParams();
    params = params.set('id', newWord.id);
    params = params.set('word', newWord.word);
    return params;
  }
}
