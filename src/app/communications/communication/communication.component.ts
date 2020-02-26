import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Communication } from 'src/app/shared/models/communication';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {
  priorities = ["[CRITICAL]", "[URGENT]", "[IMPORTANT]", "", "", ""];

  constructor(
    public dialogRef: MatDialogRef<CommunicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Communication) { }

  ngOnInit() {
    this.data.image = this.data.image.replace("open", "uc");
    console.log(this.data.imageLink);
  }

}
