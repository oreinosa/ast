import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { CaseAssignmentService } from '../case-assignment.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() type;
  @Input() pageSize = 10;
  loading = true;
  displayedColumns: string[] = ['ldap', 'name', 'monthly', 'daily', "lastAssigned"];
  pageSizeOptions = [5, 10, 20];
  dataSource = new MatTableDataSource();
  lastRefresh: Date;

  constructor(
    private caseAssignment: CaseAssignmentService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.refreshTable();
  }


  refreshTable() {
    this.dataSource.data = [];
    this.loading = true;
    this.caseAssignment.getCount(this.type)
      .subscribe(counts => {
        this.dataSource.data = counts;
        this.loading = false;
        this.pageSizeOptions.push(counts.length);
        this.lastRefresh = new Date();
      });
  }

}
