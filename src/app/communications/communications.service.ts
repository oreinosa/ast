import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Communication } from '../shared/models/communication';

const COMMS = [
  {
    timestamp: new Date("2019-09-01"),
    category: "QA",
    subject: "Disconnected chat workflow",
    imageURL: "https://i.ytimg.com/vi/gD4uACwPChA/maxresdefault.jpg",
    references: ["https://test.com", "https://testing.com"],
    ackRequired: true,
    acked: false
  },
  {
    timestamp: new Date("2019-09-02"),
    category: "CCA",
    subject: "New Chrome/Devices tags",
    imageURL: "https://www.searchenginewatch.com/wp-content/uploads/2018/10/shutterstock_1156748098.jpg",
    references: ["https://testingthetest.com"],
    ackRequired: true,
    acked: true
  },
  {
    timestamp: new Date(),
    category: "TELUS International",
    subject: "Cascadas movement",
    imageURL: "https://www.searchenginewatch.com/wp-content/uploads/2018/10/shutterstock_1156748098.jpg",
    ackRequired: false,
  },
  {
    timestamp: new Date(),
    category: "QA",
    subject: "Contact modification guidelines",
    imageURL: "https://www.searchenginewatch.com/wp-content/uploads/2018/10/shutterstock_1156748098.jpg",
    references: ["https://guidelines.com"],
    ackRequired: true,
    acked: false
  },
];

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService {
  // communications = COMMS;
  private api = environment.api;
  constructor(
    private http: HttpClient
  ) { }

  getCommunications(): Observable<Communication[]> {
    return this.http.get<Communication[]>(this.api, {
      params: {
        action: "getCommunications"
      }
    });
    // return of(this.communications);
  }

  acknowledgeCommunication(communication: Communication) {
    return this.http.get<string>(this.api, {
      params: {
        action: "ackCommunication",
        communicationId: communication.id
      }
    });
    // const index = this.communications.findIndex(comm => comm.timestamp === communication.timestamp);
    // return of(index);
  }
}
