import { NgModule } from '@angular/core';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { ThemeComponent } from './theme.component';
import { ThemeRoutingModule } from './theme-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ThemeSelectorComponent, ThemeComponent],
  imports: [
    SharedModule,
    ThemeRoutingModule
  ],
  exports: [
    ThemeSelectorComponent
  ]
})
export class ThemeModule { }
