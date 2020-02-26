import { Component, OnInit } from '@angular/core';
import { Followup } from './followup';
import { _statuses, _ideas } from '../variables';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss']
})
export class FollowupComponent implements OnInit {
  comment = new Followup();
  statuses = _statuses;
  featureIdeas = _ideas;
  constructor() { }

  ngOnInit() {
  }

}
