import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig, MatSortable } from '@angular/material';
import { CommunicationsService } from '../communications.service';
import { CommunicationComponent } from '../communication/communication.component';
import { AcknowledgeDialogComponent } from '../acknowledge-dialog/acknowledge-dialog.component';
import { Communication } from 'src/app/shared/models/communication';

@Component({
  selector: 'app-communications-table',
  templateUrl: './communications-table.component.html',
  styleUrls: ['./communications-table.component.scss']
})
export class CommunicationsTableComponent implements OnInit {
  displayedColumns: string[] = ['timestamp', 'category', 'subject', 'references', 'actions'];
  dataSource: MatTableDataSource<Communication>;

  loading = true;
  acknowledging = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private communicationsService: CommunicationsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.sort.sort(<MatSortable>{
      id: 'timestamp',
      start: "desc"
    });
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filterTable;
    this.refreshCommunications();
  }

  filterTable(data: Communication, filter: string): boolean {
    if (filter == "") {
      return false;
    }
    
  }

  refreshCommunications() {
    this.loading = true;
    this.dataSource.data = [];
    this.communicationsService.getCommunications().pipe()
      .subscribe(communications => {
        console.log(communications);
        this.dataSource.data = communications;
        this.loading = false;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewCommunication(communication: Communication) {
    let config = new MatDialogConfig();
    config.data = communication;
    this.dialog.open(CommunicationComponent, config);
  }

  acknowledgeCommunication(communication: Communication) {
    let config = new MatDialogConfig();
    config.data = communication.subject;
    let ref = this.dialog.open(AcknowledgeDialogComponent, config);

    ref.afterClosed().subscribe(flag => {
      if (flag) {
        this.acknowledging = true;
        this.communicationsService
          .acknowledgeCommunication(communication)
          .subscribe(result => {
            console.log(result);
            if (!!result) {
              this.dataSource.data = this.dataSource.data.map(_communication => {
                if (_communication.id == communication.id) {
                  return { ...communication, ack: result }
                }
                return _communication;
              });
            }
            this.acknowledging = false;
          })
      }
    })
  }

}
