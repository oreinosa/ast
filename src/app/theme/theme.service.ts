import { Injectable } from "@angular/core";
import { Theme, light, dark } from "./theme";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private active: Theme = dark;
  private availableThemes: Theme[] = [light, dark];
  constructor() {
    this.setActiveTheme(this.active);
  }

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    document.querySelector("#container").className = theme.name;

    // Object.keys(this.active.properties).forEach(property => {
    //   document.documentElement.style.setProperty(
    //     property,
    //     this.active.properties[property]
    //   );
    // });
  }
}