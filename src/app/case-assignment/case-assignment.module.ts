import { NgModule } from '@angular/core';

import { CaseAssignmentRoutingModule } from './case-assignment-routing.module';
import { CaseAssignmentComponent } from './case-assignment.component';
import { SharedModule } from '../shared/shared.module';
import { PqmComponent } from './pqm/pqm.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { FuComponent } from './fu/fu.component';
import { CasesTableComponent } from './cases-table/cases-table.component';
import { ConfirmRemoveDialogComponent } from './confirm-remove-dialog/confirm-remove-dialog.component';


@NgModule({
  declarations: [CaseAssignmentComponent, PqmComponent, OrderTableComponent, FuComponent, CasesTableComponent, ConfirmRemoveDialogComponent],
  imports: [
    SharedModule,
    CaseAssignmentRoutingModule
  ],
  entryComponents: [ConfirmRemoveDialogComponent]
})
export class CaseAssignmentModule { }
