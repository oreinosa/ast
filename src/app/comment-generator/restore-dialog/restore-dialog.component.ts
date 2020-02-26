import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommentGeneratorService } from '../comment-generator.service';

@Component({
  selector: 'app-restore-dialog',
  templateUrl: './restore-dialog.component.html',
  styleUrls: ['./restore-dialog.component.scss']
})
export class RestoreDialogComponent implements OnInit {
  commentString: any = "";
  index = 0;
  comments: any[] = null;
  pages = [];
  type: string = "";

  confirmRestore = false;
  constructor(
    private commentService: CommentGeneratorService,
    private dialogRef: MatDialogRef<RestoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.type = this.data.type;
    setTimeout(() => {
      let comments = this.commentService.getBackupComment(this.type);
      console.log(comments);
      if (comments) {
        this.comments = comments;
        console.log(this.comments);
        if (this.comments.length) {
          this.commentString = this.selectComment(0);
          for (let x = 0; x < comments.length; x++) {
            this.pages.push(x);
          }
        }
      } else {
        this.comments = [];
      }
    }, 200)

  }

  changeIndex(index: number) {
    this.index = index;
    this.commentString = this.selectComment(index);
  }

  onRestore() {
    this.dialogRef.close(this.comments[this.index]);
  }

  selectComment(index: number) {
    let comment = this.comments[index];
    console.log(comment);
    if (comment) {
      return this.commentToString(comment, this.type)
    }
    return "";
  }

  commentToString(comment: any, type: string) {
    return this.commentService.generateComment(comment, type.split("-")[0]);

  }


}
