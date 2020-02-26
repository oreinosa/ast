import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transfer } from './transfer';
import { SetupService } from '../../core/setup.service';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, tap, filter } from 'rxjs/operators';
import { CommentGeneratorService } from '../comment-generator.service';
import { _justifications } from '../variables';
import { Inbound } from '../inbound/inbound';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  reasons: any = {};
  currentReasons = [];
  comment = new Transfer();
  specialization = "";
  justifications = [..._justifications, "chat"];
  constructor(
    private setupService: SetupService,
    private commentGenerator: CommentGeneratorService
  ) { }

  ngOnInit() {
    // this.setupService.reasons.pipe(
    //   takeUntil(this.ngUnsubscribe)
    // )
    //   .subscribe(reasons => this.reasons = reasons);

    this.setupService.reasons.pipe(
      takeUntil(this.ngUnsubscribe),
      filter(reasons => !!reasons),
      tap(reasons => this.reasons = reasons),
      switchMap(() => this.commentGenerator.specialization),
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(specialization => {
        this.specialization = specialization;
        this.changeReasons(specialization);
      });

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  transferInformation(type: string) {
    const backupComment = this.commentGenerator.getBackupComment(type);
    if (backupComment) {
      this.comment = { ...this.comment, ...backupComment };
      this.comment.problem = backupComment.reason;
      this.comment.steps = backupComment.secondary;
    }
  }

  changeReasons(specialization: string) {
    // console.log('changing to ' + specialization);
    switch (specialization) {
      case "Generalist (Phone)":
        this.currentReasons = this.reasons.generalist;
        break;
      case "Generalist (Chat)":
        this.currentReasons = this.reasons.chat;
        break;
      case "Upsell":
        this.currentReasons = this.reasons.upsell;
        break;
      default:
        this.currentReasons = this.reasons.specialist;
        break;
    }
  }

  toggleJustification(justification: string) {
    this.comment.pinVerification = justification;
  }

}
