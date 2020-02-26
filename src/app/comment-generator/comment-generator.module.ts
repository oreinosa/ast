import { NgModule } from '@angular/core';

import { CommentGeneratorRoutingModule } from './comment-generator-routing.module';
import { CommentGeneratorComponent } from './comment-generator.component';
import { SharedModule } from '../shared/shared.module';
import { InboundComponent } from './inbound/inbound.component';
import { FollowupComponent } from './followup/followup.component';
import { ChatComponent } from './chat/chat.component';
import { TransferComponent } from './transfer/transfer.component';
import { CommentComponent } from './comment/comment.component';
import { ResetDialogComponent } from './reset-dialog/reset-dialog.component';
import { RestoreDialogComponent } from './restore-dialog/restore-dialog.component';
import { GetCommentStringPipe } from './get-comment-string.pipe';

@NgModule({
  declarations: [
    CommentGeneratorComponent,
    InboundComponent,
    FollowupComponent,
    ChatComponent,
    TransferComponent,
    CommentComponent,
    ResetDialogComponent,
    RestoreDialogComponent,
    GetCommentStringPipe
  ],
  imports: [
    SharedModule,
    CommentGeneratorRoutingModule
  ],
})
export class CommentGeneratorModule { }
