import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  private api = environment.api;
  private _agents = new BehaviorSubject<User[]>([]);
  private _loadingAgents = new Subject<boolean>();
  constructor(
    private http: HttpClient
  ) { }

  agentsObservable(): Observable<User[]> {
    return this._agents.asObservable();
  }

  loadingObservable(): Observable<boolean> {
    return this._loadingAgents.asObservable();
  }

  setLoading(flag: boolean){
    this._loadingAgents.next(flag);
  }

  setAgents(agents: User[]) {
    this._agents.next(agents);
  }

  getAgents(filterBy: string, searchValue: string): Observable<User[]> {
    return this.http.get<User[]>(this.api, {
      params: {
        action: "getAgentRoster",
        filterBy,
        searchValue
      }
    });
  }

  getStaffs(filterBy: string, searchValue: string): Observable<User[]> {
    return this.http.get<User[]>(this.api, {
      params: {
        action: "getStaffRoster",
        filterBy,
        searchValue
      }
    });
  }
}
