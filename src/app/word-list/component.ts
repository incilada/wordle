import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { WordListService } from '../shared/services/word-list';
import { Word } from '../shared/services/model';
import { NbWindowService } from '@nebular/theme';
import { NewWordComponent } from '../shared/components/new-word/component';
import { MessageComponent } from '../shared/components/message/component';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-word-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordListComponent implements OnInit {
  selectedWords: Word[] = [];
  transmitting = new BehaviorSubject<boolean>(false);
  constructor(
    public wordListService: WordListService,
    private windowService: NbWindowService
  ) {}

  ngOnInit(): void {}

  selectWord(isChecked: boolean, newWord: Word): void {
    if (isChecked) {
      this.selectedWords.push(newWord);
    } else {
      this.selectedWords = _.filter(this.selectedWords, (word: Word) => {
        return newWord.id !== word.id;
      });
    }
  }

  deleteWords(): void {
    const windowRef = this.windowService.open(MessageComponent, {
      title: 'Onay',
      context: {
        message: 'Kelimeler silinecek. Onaylıyor musunuz?',
      },
      buttons: { close: true, maximize: false, minimize: false },
    });
    windowRef.onClose.subscribe((value) => {
      if (value) {
        this.wordListService.deleteWords(this.selectedWords);
        this.selectedWords = [];
      }
    });
  }

  openNewWordWindow(): void {
    this.windowService.open(NewWordComponent, {
      title: 'Yeni Kelime',
      buttons: { close: true, maximize: false, minimize: false },
    });
  }

  deleteWord(word: Word): void {
    this.transmitting.next(true);
    this.wordListService.deleteWord(word).subscribe({
      next: () => {
        this.transmitting.next(false);
      },
      error: () => {
        this.transmitting.next(false);
      },
    });
  }
}
