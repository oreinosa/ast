import { Component, OnInit, OnDestroy } from '@angular/core';
import { SetupService } from '../setup.service';
import { Link } from 'src/app/shared/models/link';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  actions: Link[] = [];
  links: Link[] = [];

  constructor(
    private setup: SetupService
  ) { }

  ngOnInit() {
    this.setup.actions.pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(actions => this.actions = actions);

    this.setup.links.pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(links => this.links = links);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



}
