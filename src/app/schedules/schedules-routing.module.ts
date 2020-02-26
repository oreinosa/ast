import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulesComponent } from './schedules.component';
import { TlsComponent } from './tls/tls.component';

const routes: Routes = [
  {
    path: "schedules", component: SchedulesComponent, children: [
      { path: "tl", component: TlsComponent },
      { path: "qa", component: TlsComponent },
      { path: "sme", component: TlsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule { }
