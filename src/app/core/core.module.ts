import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AvatarComponent } from './avatar/avatar.component';
import { IsQuicklinkPipe } from './navigation/is-quicklink.pipe';
import { ProfileComponent } from './profile/profile.component';
import { CloseDialogComponent } from './close-dialog/close-dialog.component';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
  declarations: [NavigationComponent, HomeComponent, AvatarComponent, IsQuicklinkPipe, ProfileComponent, CloseDialogComponent],
  imports: [
    SharedModule,
    ThemeModule,
    CoreRoutingModule,
  ],
  exports: [
    NavigationComponent,
    CloseDialogComponent
  ],
  entryComponents: [
    CloseDialogComponent
  ]
})
export class CoreModule { }
