import { Component, OnInit, OnDestroy } from '@angular/core';
import { CcaLookupService } from './cca-lookup.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map, switchMap, tap, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PFI } from '../shared/models/pfi';

@Component({
  selector: 'app-cca-lookup',
  templateUrl: './cca-lookup.component.html',
  styleUrls: ['./cca-lookup.component.scss']
})
export class CcaLookupComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  core = [];
  chrome = [];
  selectedType = 'core';

  selectedPfi : PFI = null;
  pfiCtrl = new FormControl();
  filteredPFIs: Observable<string[]>;
  pfis = [];

  cases = [];

  constructor(
    private cca: CcaLookupService
  ) {
    this.pfiCtrl.disable();
    this.filteredPFIs = this.cca.getPFIs()
      .pipe(
        filter(pfi => !!pfi),
        tap(pfis => {
          console.log(pfis);
          this.core = pfis.core;
          this.chrome = pfis.chrome;
          this.selectType(this.selectedType);
          this.pfiCtrl.enable();
        }),
        switchMap(() => this.pfiCtrl.valueChanges),
        startWith(''),
        // tap(search => console.log(typeof search)),
        map((pfi: any) => pfi ? (this._filterPFIs(typeof pfi === "string" ? pfi : pfi.tag)) : this.pfis.slice())
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private _filterPFIs(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.pfis.slice().filter((pfi: PFI) => pfi.tag.toLowerCase().includes(filterValue));
  }

  selectType(type: String) {
    // console.log('showing tags for '+ type);
    switch (type) {
      case "core":
        this.pfis = this.core;
        break
      case "chrome":
        this.pfis = this.chrome;
        break;
    }
    // console.log(this.pfis);
    this.pfiCtrl.reset();
  }

  searchCases(pfi: PFI) {
    console.log(`searching cases with ${pfi}`);
    this.cases = [];
    this.selectedPfi = pfi;
    this.pfiCtrl.disable();
    this.cca.getCasesWithPFI(pfi.tag, this.selectedType).subscribe(cases => {
      this.cases = cases;
      this.pfiCtrl.enable();  
    });
  }

  displayFn(pfi?: PFI): string | undefined {
    return pfi ? pfi.tag : undefined;
  }

}
