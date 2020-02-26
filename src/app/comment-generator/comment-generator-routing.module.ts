import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentGeneratorComponent } from './comment-generator.component';
import { InboundComponent } from './inbound/inbound.component';
import { FollowupComponent } from './followup/followup.component';
import { ChatComponent } from './chat/chat.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {
    path: 'comment-generator', component: CommentGeneratorComponent, children: [
      { path: 'inbound', component: InboundComponent },
      { path: 'followup', component: FollowupComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'transfer', component: TransferComponent },
      { path: '', pathMatch: 'full', redirectTo: 'inbound' },
      { path: '**',redirectTo: 'inbound' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentGeneratorRoutingModule { }
