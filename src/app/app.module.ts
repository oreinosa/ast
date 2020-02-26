import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CommentGeneratorModule } from './comment-generator/comment-generator.module';
import { CcaLookupModule } from './cca-lookup/cca-lookup.module';
import { CommunicationsModule } from './communications/communications.module';
import { HttpClientModule } from '@angular/common/http';
import { SchedulesModule } from './schedules/schedules.module';
import { CaseAssignmentModule } from './case-assignment/case-assignment.module';
import { RosterModule } from './roster/roster.module';
import { CommunicationComponent } from './communications/communication/communication.component';
import { AcknowledgeDialogComponent } from './communications/acknowledge-dialog/acknowledge-dialog.component';
import { ResetDialogComponent } from './comment-generator/reset-dialog/reset-dialog.component';
import { RestoreDialogComponent } from './comment-generator/restore-dialog/restore-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    SharedModule,
    CoreModule,
    CommentGeneratorModule,
    CcaLookupModule,
    CommunicationsModule,
    SchedulesModule,
    CaseAssignmentModule,
    RosterModule
  ],
  providers: [],
  entryComponents:[
    CommunicationComponent,
    AcknowledgeDialogComponent,
    ResetDialogComponent,
    RestoreDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
