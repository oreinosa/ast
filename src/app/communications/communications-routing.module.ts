import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunicationsComponent } from './communications.component';
import { CommunicationsTableComponent } from './communications-table/communications-table.component';
import { CommunicationComponent } from './communication/communication.component';

const routes: Routes = [
  {
    path: 'communications', component: CommunicationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationsRoutingModule { }
