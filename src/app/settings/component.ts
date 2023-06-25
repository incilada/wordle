import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-settings',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  selectedTheme: string;
  constructor(private themeService: NbThemeService) {}

  ngOnInit(): void {
    this.selectedTheme = this.themeService.currentTheme;
  }

  changeTheme(themeName: string): void {
    this.themeService.changeTheme(themeName);
    this.selectedTheme = this.themeService.currentTheme;
  }
}
