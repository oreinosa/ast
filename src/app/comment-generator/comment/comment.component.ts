import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ResetDialogComponent } from '../reset-dialog/reset-dialog.component';
import { CommentGeneratorService } from '../comment-generator.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { takeUntil, tap, debounceTime } from 'rxjs/operators';
import { RestoreDialogComponent } from '../restore-dialog/restore-dialog.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy, AfterViewInit {
  private ngUnsubscribe = new Subject();
  comment: string = '';
  @Input() form: NgForm;
  @Input() type: string;
  noCdmLicenses = false;
  constructor(public dialog: MatDialog, private commentService: CommentGeneratorService) { }

  ngOnInit() {
    this.commentService.commentSubject.pipe(
      takeUntil(this.ngUnsubscribe),
      // tap(comment => console.log(comment))
    )
      .subscribe(comment => this.comment = comment);
  }

  ngAfterViewInit() {

    setTimeout(() => {
      const backupComment = this.commentService.getBackupComment(this.type);
      if (backupComment) {
        this.form.setValue(backupComment);
        this.form.form.markAsDirty();
      }
      this.form.valueChanges.pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(1000),
        tap(value => console.log(value))
      )
        .subscribe(value => this.commentService.setBackupComment(value, this.type));
    }, 250);
  }

  ngOnDestroy() {
    // this.commentService.resetComment(this.form);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    // console.log(this.form.value, this.type);
    let comment = { ...this.form.value };
    comment.noCdmLicenses = this.noCdmLicenses;
    let commentString = this.commentService.generateComment(comment, this.type);
    this.commentService.updateComment(commentString);
  }

  onReset(): void {
    const dialogRef = this.dialog.open(ResetDialogComponent);
    dialogRef.afterClosed().subscribe((flag: boolean) => {
      // console.log('The dialog was closed');
      if (flag) {
        this.commentService.setRestoreComment(this.form.value, this.type);
        this.noCdmLicenses = false;
        this.commentService.resetComment(this.form);
      }
    });
  }

  onRestore() {
    const dialogRef = this.dialog.open(RestoreDialogComponent, {
      data: {
        type: `${this.type}-restore`,
        pendingWork: this.form.dirty
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe((comment: any) => {
      // console.log('The dialog was closed');
      if (comment) {
        this.form.resetForm(comment);
        this.form.form.markAsDirty();
      }
    });
  }

}
