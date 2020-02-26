import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PFI } from 'src/app/shared/models/pfi';
import { Case } from 'src/app/shared/models/case';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
  displayedColumns: string[] = ['closedDate', 'caseNumber', 'lob'];
  @Input('cases') cases: Case[];
  dataSource: MatTableDataSource<Case>;
  @Input() pfi: PFI;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.cases);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
