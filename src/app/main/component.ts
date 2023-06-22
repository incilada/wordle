import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Game } from '../shared/games/model';
import { GameFactory } from '../shared/games/factory';
import { GameService } from '../shared/services/game';

@Component({
  selector: 'app-main',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  gameList: Game[] = [];
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameList = new GameFactory().create();
  }

  openGame(game: Game): void {
    this.gameService.openGame(game);
  }
}
