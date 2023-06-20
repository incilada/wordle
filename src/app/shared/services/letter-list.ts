import { KeyboardItem } from '../letters';
import { Keyboard, KeyboardStatus } from './model';

export class LetterListFactory {
  create(): Keyboard[] {
    const items = [];
    Object.keys(KeyboardItem).forEach((element) => {
      items.push(this.createItem(element as KeyboardItem));
    });
    return items;
  }

  private createItem(element: KeyboardItem): Keyboard {
    const item = {} as Keyboard;
    item.item = element;
    item.lowerCase = element.toLocaleLowerCase('tr');
    item.status = KeyboardStatus.NonUsed;
    return item;
  }
}
