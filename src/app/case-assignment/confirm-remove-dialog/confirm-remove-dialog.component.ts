import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-remove-dialog',
  templateUrl: './confirm-remove-dialog.component.html',
  styleUrls: ['./confirm-remove-dialog.component.scss']
})
export class ConfirmRemoveDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmRemoveDialogComponent>
  ) { }

  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
