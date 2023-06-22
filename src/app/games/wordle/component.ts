import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Level } from './level';
import { GameService } from './service';
import * as _ from 'underscore';
import {
  GameStatus,
  Keyboard,
  KeyboardStatus,
} from '../../shared/services/model';
import { NbWindowService } from '@nebular/theme';
import { GameResultComponent } from '../../shared/components/game-result/component';
import { KeyboardItem } from '../../shared/letters';
@Component({
  selector: 'app-wordle',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  providers: [GameService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordleComponent implements OnInit {
  Level = Level;
  turkishCharCode = [219, 221, 186, 222, 191, 220];
  eventListener;
  keyboardStatus = KeyboardStatus;
  constructor(
    public gameService: GameService,
    public changeDetector: ChangeDetectorRef,
    private windowService: NbWindowService
  ) {}

  ngOnInit(): void {
    this.listenGameStatus();
  }

  listenGameStatus(): void {
    this.gameService.gameStatus.subscribe((status) => {
      if (status === GameStatus.Win || status === GameStatus.Loss) {
        this.openGameResult(status);
      }
    });
  }

  private openGameResult(status: GameStatus): void {
    const windowRef = this.windowService.open(GameResultComponent, {
      title: 'Oyun Sonucu',
      context: {
        status: status,
        correctWord: this.gameService.word.title,
      },
      buttons: { close: true, maximize: false, minimize: false },
    });
    windowRef.onClose.subscribe((value) => {
      if (value) {
        this.removeListener();
        this.gameService.reset();
        this.changeDetector.detectChanges();
      }
    });
  }

  onSelectedLevelChanged(level: Level): void {
    this.gameService.level = level;
  }

  startGame(): void {
    this.gameService.create();
    this.listenKeyDown();
  }

  onKeyboardItemClicked(letter: Keyboard): void {
    if (letter.item === KeyboardItem.Del) {
      this.gameService.deleteLastLetter();
    } else if (letter.item === KeyboardItem.Enter) {
      this.gameService.checkWord();
    } else {
      this.setLetter(letter.lowerCase);
    }
  }

  private listenKeyDown(): void {
    this.eventListener = this.keydown.bind(this);
    document.addEventListener('keydown', this.eventListener);
  }

  private keydown(event: KeyboardEvent): void {
    if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      this.turkishCharCode.indexOf(event.keyCode) > -1
    ) {
      console.log(event.key);
      this.setLetter(event.key);
    } else if (event.keyCode === 8) {
      this.gameService.deleteLastLetter();
    } else if (event.keyCode === 13) {
      this.gameService.checkWord();
    }
    this.changeDetector.detectChanges();
  }

  private setLetter(letter: string): void {
    const activeLetter = _.where(this.gameService.activePrediction.letters, {
      isEmpty: true,
    })[0];
    if (activeLetter) {
      activeLetter.guess = letter;
      activeLetter.isEmpty = false;
    }
  }

  private removeListener(): void {
    document.removeEventListener('keydown', this.eventListener);
  }

  private finishGame(): void {
    this.removeListener();
  }

  ngOnDestroy(): void {
    this.finishGame();
  }
}
