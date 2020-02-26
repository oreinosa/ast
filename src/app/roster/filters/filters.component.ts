import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RosterService } from '../roster.service';
import { tap, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  filterBy = "ldap";
  searchValue = "";
  agents: User[] = [];
  staffs: User[] = [];

  specializations = [
    "Generalist",
    "Upsell",
    "Bi-Panel",
    "Collab",
    "Email",
    "MSM",
    "Devices"
  ];
  loading: boolean = false;

  constructor(
    private roster: RosterService
  ) { }

  ngOnInit() {
    this.roster.loadingObservable().pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(loading => this.loading = loading);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onFilterChange(filterBy: string) {
    switch (filterBy) {
      case "supervisorName":
        this.getStaffs();
        break;
    }
  }

  getAgents() {
    this.roster.setLoading(true);
    this.roster.setAgents([]);
    this.roster.getAgents(this.filterBy, this.searchValue).pipe()
      .subscribe(agents => {
        // console.log(agents);
        this.roster.setLoading(false);
        this.roster.setAgents(agents)
      });
  }

  getStaffs() {
    this.staffs = [];
    this.roster.getStaffs("specialization", "Team Leader").pipe()
      .subscribe(staffs => this.staffs = staffs);
  }

  onSearchLDAP(valid: boolean, event: KeyboardEvent) {
    if (!valid) return;
    const key = event.key;
    if (event.key === "Enter") {
      this.getAgents();
    }
  }
}
