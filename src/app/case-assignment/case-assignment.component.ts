import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Link } from '../shared/models/link';
import { SetupService } from '../core/setup.service';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-case-assignment',
  templateUrl: './case-assignment.component.html',
  styleUrls: ['./case-assignment.component.scss']
})
export class CaseAssignmentComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  links: Link[] = [];
  constructor(
    private setup: SetupService
  ) { }

  ngOnInit() {
    this.setup.actions.pipe(
      takeUntil(this.ngUnsubscribe),
      filter(actions => !!actions.length)
    )
      .subscribe(actions => this.links = actions.find(action => action.route === "case-assignment").children);
  }

}
