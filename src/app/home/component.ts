import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { GlobalConstantsToken } from '../shared/token';
import { GameFactory } from '../shared/games/factory';
import { Game } from '../shared/games/model';
import { GameService } from '../shared/services/game';

@Component({
  selector: 'app-home',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(GlobalConstantsToken) public globalConstants: GlobalConstants,
    public gameService: GameService
  ) {}

  ngOnInit(): void {}
}
