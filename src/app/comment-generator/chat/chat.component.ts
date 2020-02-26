import { Component, OnInit } from '@angular/core';
import { Chat } from './chat';
import { _statuses, _ideas } from '../variables';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  comment = new Chat();
  statuses = _statuses;
  featureIdeas = _ideas;
  constructor() { }

  ngOnInit() {
  }

}
