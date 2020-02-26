import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { RosterService } from '../roster.service';
import { takeUntil, switchMap, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-agents-table',
  templateUrl: './agents-table.component.html',
  styleUrls: ['./agents-table.component.scss']
})
export class AgentsTableComponent implements OnInit, OnDestroy {
  // agents: User[] = [];
  ngUnsubscribe = new Subject();
  dataSource = new MatTableDataSource<User>();
  displayedColumns = ["ldap", "name", "email", "specialization", "language", "channel", "workdayID", "supervisorName"];
  $loading: Observable<boolean>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  
  constructor(
    private roster: RosterService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.$loading = this.roster.loadingObservable();

    this.roster.agentsObservable().pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(agents => {
        console.log(agents);
        this.dataSource.data = agents
      });
  }

  ngOnDestroy() {
    this.roster.setAgents([]);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
