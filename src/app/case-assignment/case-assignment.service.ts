import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SetupService } from '../core/setup.service';

@Injectable({
  providedIn: 'root'
})
export class CaseAssignmentService {
  api = environment.api;

  constructor(
    private http: HttpClient,
    private setup: SetupService
  ) { }

  getCount(group: string): Observable<any> {
    return this.http.get<[]>(this.api, {
      params: {
        action: "getCount",
        group
      }
    }).pipe(
      map(counts => (!!counts && counts.length) ?
        counts.sort((a: any, b: any) => (a.monthly > b.monthly) ? -1 : 1)
        : []
      ));
  }

  getAssigned(group: string): Observable<any> {
    return this.http.get<[]>(this.api, {
      params: {
        action: "getAssigned",
        group
      }
    });
  }

  isAssignmentPOC(): Observable<boolean> {
    return this.http.get<boolean>(this.api, {
      params: {
        action: "isPOC",
      }
    });
  }

  removeAssigned(group: string, id: number) {
    return this.http.get<boolean>(this.api, {
      params: {
        action: "removeAssigned",
        group: group,
        id: id.toString()
      }
    });
  }
}
