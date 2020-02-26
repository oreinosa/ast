import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-acknowledge-dialog',
  templateUrl: './acknowledge-dialog.component.html',
  styleUrls: ['./acknowledge-dialog.component.scss']
})
export class AcknowledgeDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {
  }

}
