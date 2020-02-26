import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseAssignmentComponent } from './case-assignment.component';
import { PqmComponent } from './pqm/pqm.component';
import { FuComponent } from './fu/fu.component';


const routes: Routes = [
  {
    path: "case-assignment", component: CaseAssignmentComponent, children: [
      { path: 'pqm', component: PqmComponent },
      { path: 'followups', component: FuComponent },
      { path: '', pathMatch: "full", redirectTo: "pqm" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseAssignmentRoutingModule { }
