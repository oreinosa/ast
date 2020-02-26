import { NgModule } from '@angular/core';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesComponent } from './schedules.component';
import { SmesComponent } from './smes/smes.component';
import { QasComponent } from './qas/qas.component';
import { TlsComponent } from './tls/tls.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SchedulesComponent, SmesComponent, QasComponent, TlsComponent],
  imports: [
    SharedModule,
    SchedulesRoutingModule
  ]
})
export class SchedulesModule { }
