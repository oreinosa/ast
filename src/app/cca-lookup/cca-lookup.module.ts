import { NgModule } from '@angular/core';

import { CcaLookupRoutingModule } from './cca-lookup-routing.module';
import { CcaLookupComponent } from './cca-lookup.component';
import { SharedModule } from '../shared/shared.module';
import { CasesComponent } from './cases/cases.component';

@NgModule({
  declarations: [CcaLookupComponent, CasesComponent],
  imports: [
    SharedModule,
    CcaLookupRoutingModule
  ]
})
export class CcaLookupModule { }
