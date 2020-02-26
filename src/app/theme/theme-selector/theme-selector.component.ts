import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Theme } from '../theme';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {
  themes = [];
  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.themes = this.themeService.getAvailableThemes();
  }

  setTheme(theme: Theme){
    this.themeService.setActiveTheme(theme);
  }

}
