import { Component, OnInit } from '@angular/core';
import { Inbound } from './inbound';
import { _statuses, _ideas, _justifications } from '../variables';

@Component({
  selector: 'app-inbound',
  templateUrl: './inbound.component.html',
  styleUrls: ['./inbound.component.scss']
})
export class InboundComponent implements OnInit {
  comment = new Inbound();
  statuses = _statuses;
  featureIdeas = _ideas;
  justifications = _justifications;
  constructor() { }

  ngOnInit() {
  }

  toggleJustification(justification: string) {
    // if (this.comment.pinVerification != "") {
      this.comment.pinVerification = justification;
    // }
  }
}
