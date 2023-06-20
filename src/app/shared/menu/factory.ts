import { NbMenuItem } from '@nebular/theme';

export class MenuFactory {
  create(): NbMenuItem[] {
    return [
      {
        title: 'Anasayfa',
        home: true,
        link: 'home',
      },
      {
        title: 'Yeni Oyun',
        link: '/new-game',
      },
      {
        title: 'Kelime Listesi',
        link: 'word-list',
        hidden: true,
      },
      {
        title: 'Ayarlar',
        link: 'settings',
      },
      {
        title: 'Hakkında',
        link: 'about',
      },
    ] as NbMenuItem[];
  }
}
