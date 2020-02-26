import { NgModule } from '@angular/core';

import { RosterRoutingModule } from './roster-routing.module';
import { RosterComponent } from './roster.component';
import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { SharedModule } from '../shared/shared.module';
import { FiltersComponent } from './filters/filters.component';
import { AgentsTableComponent } from './agents-table/agents-table.component';


@NgModule({
  declarations: [RosterComponent, AgentProfileComponent, FiltersComponent, AgentsTableComponent],
  imports: [
    SharedModule,
    RosterRoutingModule
  ]
})
export class RosterModule { }
