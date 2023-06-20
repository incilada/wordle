import { Injectable } from '@angular/core';
import { Word } from './model';
import { HttpService } from './http';
import * as _ from 'underscore';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WordListService {
  wordListMap: Map<number, Word[]> = new Map();
  wordList = new BehaviorSubject<Word[]>(null);

  constructor(private httpService: HttpService) {
    this.getWords();
    console.log(this.wordList.value);
  }

  deleteWord<T>(word: Word): Observable<T> {
    return this.httpService.delete<T>(word).pipe(
      tap(() => {
        this.getWords();
      })
    );
  }

  deleteWords(words: Word[]): void {
    this.httpService.deleteAll(words).subscribe(() => {
      console.log('test');
      this.getWords();
    });
  }

  private getWords(): void {
    this.httpService.get().subscribe((response: any) => {
      const newWords = [];
      for (let word of response.words) {
        if (word.word.split(' ').length === 1) {
          if (!this.wordListMap.get(word.word.length)) {
            this.wordListMap.set(word.word.length, []);
          }
          const mapItem = this.wordListMap.get(word.word.length);
          const wordItem = this.createItem(word);
          mapItem?.push(wordItem);
          newWords.push(wordItem);
        }
      }
      this.wordList.next(
        _.unique(_.sortBy(newWords, 'title').reverse(), 'title')
      );
      this.setLocalStorage('words', newWords);
    });
  }

  private setLocalStorage(key: string, list: any) {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(list));
  }

  private createItem(word: any): Word {
    const item = {} as Word;
    item.id = word.id;
    item.key = word.word;
    item.title = word.word;
    item.length = word.word.length;
    return item;
  }
}
