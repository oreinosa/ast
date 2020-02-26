import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCheckboxModule, MatMenuModule, MatCardModule, MatTooltipModule, MatSelectModule, MatAutocompleteModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatProgressSpinnerModule, MatDatepickerModule, MatDialogModule, MatButtonToggleModule, MatTabsModule, MatRadioModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [CapitalizePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatRadioModule,
    SharedRoutingModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatRadioModule,
    CapitalizePipe,
  ]
})
export class SharedModule { }
