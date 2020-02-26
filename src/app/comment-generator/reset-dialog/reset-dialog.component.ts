import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.scss']
})
export class ResetDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onReset(): void {
    // reset comment and form TODO
    this.dialogRef.close(true);
  }

}
