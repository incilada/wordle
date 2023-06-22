export interface Game {
  id: number;
  code: GameCode;
  title: string;
  selected: boolean;
  iconClass: string;
}

export enum GameCode {
  Wordle = 'wordle',
}
