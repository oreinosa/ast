import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { SetupService } from '../setup.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  user: User;
  constructor(
    private setupService: SetupService
  ) { }

  ngOnInit() {
    this.setupService.user.pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



}
