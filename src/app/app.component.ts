import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem, NbPosition } from '@nebular/theme';
import { MenuFactory } from './shared/menu/factory';
import { WordListService } from './shared/services/word-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  menuItems: NbMenuItem[] = [];
  contextMenuPlacement = NbPosition.BOTTOM;
  title = 'wordle';
  constructor(private wordList: WordListService) {}
  ngOnInit(): void {
    this.menuItems = new MenuFactory().create();
  }
}
