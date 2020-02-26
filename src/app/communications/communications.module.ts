import { NgModule } from '@angular/core';

import { CommunicationsRoutingModule } from './communications-routing.module';
import { CommunicationsComponent } from './communications.component';
import { SharedModule } from '../shared/shared.module';
import { CommunicationsTableComponent } from './communications-table/communications-table.component';
import { CommunicationComponent } from './communication/communication.component';
import { AcknowledgeDialogComponent } from './acknowledge-dialog/acknowledge-dialog.component';

@NgModule({
  declarations: [CommunicationsComponent, CommunicationsTableComponent, CommunicationComponent, AcknowledgeDialogComponent],
  imports: [
    SharedModule,
    CommunicationsRoutingModule
  ]
})
export class CommunicationsModule { }
