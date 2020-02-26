import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcaLookupComponent } from './cca-lookup.component';

const routes: Routes = [
  { path: "cca-lookup", component: CcaLookupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcaLookupRoutingModule { }
