import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Game } from '../shared/games/model';
import { GameFactory } from '../shared/games/factory';
import { GameService } from '../shared/services/game';
import { Router } from '@angular/router';
import { Path } from '../app-routing.module';

@Component({
  selector: 'app-main',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  gameList: Game[] = [];
  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.gameList = new GameFactory().create();
  }

  openGame(game: Game): void {
    this.gameService.openGame(game);
  }

  openSettingsPage(): void {
    this.router.navigateByUrl('/' + Path.Settings);
  }

  openAboutPage(): void {
    this.router.navigateByUrl('/' + Path.About);
  }
}
