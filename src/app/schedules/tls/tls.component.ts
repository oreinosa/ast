import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../schedules.service';

@Component({
  selector: 'app-tls',
  templateUrl: './tls.component.html',
  styleUrls: ['./tls.component.scss']
})
export class TlsComponent implements OnInit {

  constructor(
    private schedulesService: SchedulesService
  ) { }

  ngOnInit() {
    this.schedulesService.getSchedules("tl").subscribe(res => console.log(res));
  }

}
