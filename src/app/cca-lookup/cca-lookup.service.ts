import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SetupService } from '../core/setup.service';

@Injectable({
  providedIn: 'root'
})
export class CcaLookupService {
  pfisSubject = new BehaviorSubject<{ core?: string[], chrome?: string[] }>(null);
  // corePFIs = new BehaviorSubject<string[]>([]);
  // chromePFIs = new BehaviorSubject<string[]>([]);
  api = environment.api;
  constructor(
    private setup: SetupService,
    private http: HttpClient
  ) {
    // this.setup.getPFIs();
    this.getPFI();
  }

  getPFIs() {
    return this.pfisSubject.asObservable();
    // return this.setup.pfis;
  }

  getPFI(): void {
    console.log('get pfi');
    if (!this.pfisSubject.value) {
      this.http.get<any>(this.api, {
        params: {
          action: "getPFIs"
        }
      })
        .subscribe(pfis => {
          this.pfisSubject.next(pfis);
          // this.corePFIs.next(pfis.core);
          // this.chromePFIs.next(pfis.chrome);
        });
    }
  }


  getCasesWithPFI(pfi: string, group: string) {
    return this.http.get<any>(this.api, {
      params: {
        action: "getCasesByPFI",
        pfi: pfi,
        group: group
      }
    });
  }
}
