import { Game, GameCode } from './model';

export class GameFactory {
  create(): Game[] {
    const games = [];
    games.push(this.createWordle());
    games.push(this.createWordle());
    games.push(this.createWordle());
    games.push(this.createWordle());
    games.push(this.createWordle());
    games.push(this.createWordle());
    return games;
  }

  private createWordle(): Game {
    return {
      id: 1,
      code: GameCode.Wordle,
      title: 'Wordle',
      selected: false,
      iconClass: 'word-icon',
    } as Game;
  }
}
