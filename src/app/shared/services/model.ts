import { KeyboardItem } from '../letters';

export interface WordResponse {
  id: string;
  word: string;
}

export interface Word {
  id: string;
  title: string;
  key: string;
  letters?: Letter[];
  length: number;
}

export interface Letter {
  letter: string;
  isVisible: boolean;
  correctPlace: boolean;
  isEmpty: boolean;
  has: boolean;
  guess: string;
  status: KeyboardStatus;
}

export interface Prediction {
  isActive: boolean;
  isVisible: boolean;
  letters: Letter[];
  word: string;
  isUsed: boolean;
}

export enum Status {
  Finished = 1,
  Wrong = -1,
  Missing = 2,
  New = 0,
}

export enum GameStatus {
  Win = 1,
  New = 0,
  Loss = -1,
}

export enum KeyboardStatus {
  Correct = 'success',
  Wrong = 'warning',
  NonUsed = 'primary',
  Used = 'basic',
}

export interface Keyboard {
  item: KeyboardItem;
  lowerCase: string;
  status: KeyboardStatus;
}
