import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Schedule } from '../shared/models/schedule';
import { SetupService } from '../core/setup.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  tlSchedules = new BehaviorSubject<Schedule[]>([]);
  smeSchedules = new BehaviorSubject<Schedule[]>([]);
  qaSchedules = new BehaviorSubject<Schedule[]>([]);
  api = environment.api;
  constructor(
    private setupService: SetupService,
    private http: HttpClient
  ) {

  }

  getSchedules(group: string) {
    return this.http.get<any>(this.api, {
      params: {
        action: "getSchedules",
        group: group
      }
    });
  }

}
