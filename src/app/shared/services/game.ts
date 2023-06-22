import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../games/model';
import { GameFactory } from '../games/factory';

@Injectable({ providedIn: 'root' })
export class GameService {
  selectedGame = new BehaviorSubject<Game>(null);
  games = [];

  constructor() {
    this.games = this.getGameList();
  }

  openGame(game: Game): void {
    this.selectedGame.next(_.find(this.games, { id: game.id }));
    console.log(this.selectedGame.value);
  }

  finishGame(): void {
    this.selectedGame.next(null);
  }

  private getGameList(): Game[] {
    return new GameFactory().create();
  }
}
