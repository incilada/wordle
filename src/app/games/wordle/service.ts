import { Injectable } from '@angular/core';
import { WordListService } from '../../shared/services/word-list';
import { Level } from './level';
import * as _ from 'underscore';
import {
  Letter,
  Prediction,
  Word,
  GameStatus,
  Keyboard,
  KeyboardStatus,
} from '../../shared/services/model';
import { BehaviorSubject, timer } from 'rxjs';
import { isPresent } from '../../shared/common';
import { LetterListFactory } from '../../shared/services/letter-list';

@Injectable()
export class GameService {
  level: Level;
  word: Word;
  count: number;
  predictions: Prediction[];
  activePrediction: Prediction;
  gameStatus = new BehaviorSubject<GameStatus>(GameStatus.New);
  activeIndex = 0;
  predictionWordList: string[] = [];
  checking = new BehaviorSubject<boolean>(false);
  keyboardItems: Keyboard[];
  constructor(private wordListService: WordListService) {}

  create(): void {
    if (!this.level) {
      return;
    }
    let selectedWords: Word[];
    switch (this.level) {
      case Level.Easy:
        selectedWords = this.wordListService.wordListMap.get(4);
        break;
      case Level.Middle:
        selectedWords = this.wordListService.wordListMap.get(5);
        break;
      case Level.Hard:
        selectedWords = this.wordListService.wordListMap.get(6);
        break;
      default:
        break;
    }
    this.word = this.selectRandomWord(selectedWords);
    this.keyboardItems = new LetterListFactory().create();
    this.word.letters = this.createLetterArr(this.word.title);
    this.predictions = [];
    this.addPredictions(this.word.title);
    this.setVisiblePrediction(this.activeIndex);
    this.setActivePrediction(this.activeIndex);
    this.activePrediction = this.getActivePrediction();
  }

  checkWord(): void {
    this.checking.next(true);
    const activeLetter = _.where(this.activePrediction.letters, {
      isEmpty: true,
    })[0];
    if (!isPresent(activeLetter)) {
      timer(1000).subscribe(() => {
        this.checkGameStatus();
      });
    } else {
      this.checking.next(false);
    }
  }

  deleteLastLetter(): void {
    const last = _.last(
      _.where(this.activePrediction.letters, { isEmpty: false })
    );
    if (isPresent(last)) {
      last.guess = '';
      last.isEmpty = true;
    }
  }

  private checkGameStatus(): void {
    const gussedWord = _.pluck(this.activePrediction.letters, 'guess').join('');
    if (gussedWord === this.word.title) {
      this.checkLetters(gussedWord);
      this.gameStatus.next(GameStatus.Win);
    } else if (
      !this.checkWordList(gussedWord) ||
      this.checkPredictionList(gussedWord)
    ) {
      this.setEmptyActivePrediction();
    } else {
      this.checkLetters(gussedWord);
      this.predictionWordList.push(gussedWord);
      if (this.predictionWordList.length > 5) {
        this.gameStatus.next(GameStatus.Loss);
        return;
      }
      this.setPassivePrediction(this.activeIndex);
      this.activeIndex += 1;
      this.setActivePrediction(this.activeIndex);
      this.setVisiblePrediction(this.activeIndex);
    }
    this.checking.next(false);
  }

  private checkLetters(guess: string): void {
    this.activePrediction.letters.forEach((value, key) => {
      if (value.letter === guess[key]) {
        value.correctPlace = true;
        value.status = KeyboardStatus.Correct;
      }
    });
    // const other = _.filter(this.activePrediction.letters, (letter) => {
    //   return letter.correctPlace !== true
    // })
    for (let i = 0; i < guess.length; i++) {
      if (_.indexOf(this.activePrediction.word, guess[i]) > -1) {
        if (!this.activePrediction.letters[i].correctPlace) {
          this.activePrediction.letters[i].has = true;
          this.activePrediction.letters[i].status = KeyboardStatus.Wrong;
        }
      }
    }
    this.signKeyboarLetter();
  }

  private checkPredictionList(guessWord: string): boolean {
    return _.indexOf(this.predictionWordList, guessWord) > -1;
  }

  private checkWordList(guessWord: string): boolean {
    return (
      _.where(this.wordListService.wordList.value, { title: guessWord })
        .length > 0
    );
  }

  private setEmptyActivePrediction(): void {
    this.activePrediction.letters.forEach((letter) => {
      letter.guess = '';
      letter.isEmpty = true;
    });
  }

  private addPredictions(text: string): void {
    for (let index = 0; index < 6; index++) {
      const word = {
        isActive: false,
        word: text,
        isUsed: false,
        isVisible: false,
      } as Prediction;
      word.letters = this.createLetterArr(text);
      this.predictions.push(word);
    }
  }

  private selectRandomWord(words: Word[]): Word | any {
    const random = Math.floor(Math.random() * words.length);
    return words[random];
  }

  private createLetterArr(title: string): Letter[] {
    const letters: Letter[] = [];
    for (let letter of title) {
      letters.push({
        correctPlace: false,
        isEmpty: true,
        isVisible: false,
        has: false,
        guess: '',
        letter,
        status: KeyboardStatus.NonUsed,
      });
    }
    return letters;
  }

  private setVisiblePrediction(activeIndex: number): void {
    this.predictions[activeIndex].isVisible = true;
  }

  private setActivePrediction(activeIndex: number): void {
    this.predictions[activeIndex].isActive = true;
    this.activePrediction = this.predictions[activeIndex];
  }

  private setPassivePrediction(activeIndex: number): void {
    this.predictions[activeIndex].isActive = false;
  }

  private setUsedPrediction(prediction: Prediction): void {
    prediction.isUsed = true;
  }

  private signKeyboarLetter(): void {
    const correctLetters = _.where(this.activePrediction.letters, {
      correctPlace: true,
    });
    const has = _.where(this.activePrediction.letters, { has: true });
    correctLetters.forEach((letter) => {
      const item = _.where(this.keyboardItems, { lowerCase: letter.guess })[0];
      item.status = KeyboardStatus.Correct;
    });
    has.forEach((letter) => {
      const item = _.where(this.keyboardItems, { lowerCase: letter.guess })[0];
      if (item.status !== KeyboardStatus.Correct) {
        item.status = KeyboardStatus.Wrong;
      }
    });
    const other = _.filter(this.activePrediction.letters, (item) => {
      return !item.correctPlace && !item.has;
    });
    other.forEach((letter) => {
      const item = _.where(this.keyboardItems, { lowerCase: letter.guess })[0];
      item.status = KeyboardStatus.Used;
    });
  }

  private getActivePrediction(): Prediction {
    return _.find(this.predictions, {
      isActive: true,
    });
  }

  public reset(): void {
    this.word = null;
    this.predictions = [];
    this.predictionWordList = [];
    this.level = null;
  }

  changeLevel(level: Level): void {
    this.level = level;
  }
}
