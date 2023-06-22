import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import * as _ from 'underscore';
import { GameStatus } from '../../services/model';
@Component({
  selector: 'app-game-result',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameResultComponent implements OnInit {
  @Input() status: GameStatus;
  @Input() correctWord: string;
  GameStatus = GameStatus;

  constructor(private windowRef: NbWindowRef) {}

  ngOnInit(): void {}

  newGame(): void {
    this.windowRef.close(true);
  }

  close(): void {
    this.windowRef.close(false);
  }
}
