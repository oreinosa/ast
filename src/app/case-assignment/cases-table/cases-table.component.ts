import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { CaseAssignmentService } from '../case-assignment.service';
import { switchMap, tap } from 'rxjs/operators';
import { ConfirmRemoveDialogComponent } from '../confirm-remove-dialog/confirm-remove-dialog.component';

@Component({
  selector: 'app-cases-table',
  templateUrl: './cases-table.component.html',
  styleUrls: ['./cases-table.component.scss']
})
export class CasesTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() type;
  @Input() pageSize = 10;
  loading = true;
  removing = false;
  displayedColumns: string[] = ['timestamp', 'caseNumber', 'assignedTo', 'assignedBy'];
  pageSizeOptions = [5, 10, 20];
  dataSource = new MatTableDataSource();
  lastRefresh: Date;

  isPOC = false;

  constructor(
    private caseAssignment: CaseAssignmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.type === "fu") {
      this.displayedColumns = ['timestamp', 'caseNumber', 'assignedTo', 'returnTo', 'type', 'assignedBy'];
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.checkPOC();
    this.refreshTable();
  }

  checkPOC() {
    this.caseAssignment.isAssignmentPOC().subscribe(isPOC => {
      this.isPOC = isPOC;
      if (this.isPOC) {
        this.displayedColumns.push('actions');
      }
    });
  }

  refreshTable() {
    this.dataSource.data = [];
    this.loading = true;
    this.caseAssignment.getAssigned(this.type)
      .subscribe(cases => {
        console.log(cases);
        this.dataSource.data = cases;
        this.loading = false;
        // this.pageSizeOptions.push(cases.length);
        this.lastRefresh = new Date();
      });
  }

  confirmRemove(id: number): void {
    const dialogRef = this.dialog.open(ConfirmRemoveDialogComponent);

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) this.removeAssigned(id);
    });
  }

  removeAssigned(id: number) {
    this.removing = true;
    this.caseAssignment.removeAssigned(this.type, id).subscribe(flag => {
      console.log(flag);
      if (flag) {
        let currentCases = this.dataSource.data.slice();
        let index = currentCases.findIndex((row: any) => row.id === id);
        currentCases.splice(index, 1);
        this.dataSource.data = currentCases;
      }
      this.removing = false;
    });
  }
}
