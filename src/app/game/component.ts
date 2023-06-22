import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { GlobalConstantsToken } from '../shared/token';
import { GameCode } from '../shared/games/model';
import { GameService } from '../shared/services/game';

@Component({
  selector: 'app-game',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  GameCode = GameCode;
  constructor(
    @Inject(GlobalConstantsToken) public globalConstants: GlobalConstants,
    public gameService: GameService
  ) {}

  onBackButtonClicked(): void {
    this.gameService.finishGame();
  }

  ngOnInit(): void {}
}
