import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { BehaviorSubject } from 'rxjs';
import { Link } from '../shared/models/link';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../shared/models/schedule';

interface Setup {
  profile: User;
  links: Link[];
  reasons: any;
  scopes: any;
  forms: [];
}

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  user = new BehaviorSubject<User>(null);
  links = new BehaviorSubject<Link[]>([]);
  actions = new BehaviorSubject<Link[]>([]);
  reasons = new BehaviorSubject<any>(null);
  scopes = new BehaviorSubject<any>(null);
  forms = new BehaviorSubject<[]>([]);
  pfis = new BehaviorSubject<{ core?: string[], chrome?: string[] }>(null);

  tlSchedules = new BehaviorSubject<Schedule[]>([]);
  smeSchedules = new BehaviorSubject<Schedule[]>([]);
  qaSchedules = new BehaviorSubject<Schedule[]>([]);

  api = environment.api;
  prod = environment.production;

  constructor(
    private http: HttpClient
  ) {
    this.initApp();
  }

  initApp(): void {
    if (this.prod) {
      let roster = window.localStorage.getItem("roster");
      roster = !!roster ? roster : "agent";
      let ldap = window.localStorage.getItem("ldap");
      ldap = !!ldap ? ldap : "";
      this.http.get<User>(this.api, {
        params: {
          roster,
          ldap
        }
      })
        .subscribe(user => {
          console.log(user);
          window.localStorage.setItem("ldap", user.ldap);
          window.localStorage.setItem("roster", user.roster);
          this.user.next(user);
          this.getLinks(user);
          this.getSetup(user);
        });
    } else {
      const user = {
        id: 246,
        name: "Oscar Reinosa",
        email: "oreinosa@google.com",
        specialization: "Devices",
        workdayID: "1231231",
        language: "English",
        channel: "Phone",
        supervisorName: "Jose Castaneda",
        roster: "staff",
        ldap: "oreinosa"
      };
      this.user.next(user);
      this.getLinks(user);
      this.getSetup(user);
    }
  }

  getLinks(user) {
    let actions = this.getActions(user);
    this.actions.next(actions);

    this.http.get<Link[]>(this.api, {
      params: {
        action: "getLinks"
      },
    })
      .subscribe(links => {
        console.log(links);
        this.links.next(links);
      });
  }

  getSetup(user) {
    this.http.get<Setup>(this.api, {
      params: {
        action: "getSetup"
      },
    })
      .subscribe(setup => {
        console.log(setup);
        this.reasons.next(setup.reasons);
        this.scopes.next(setup.scopes);
        this.forms.next(setup.forms);
      });
  }

  getActions(user: User): Link[] {
    let prodActions: Link[] = [
      {
        label: "Comment Generator", icon: "assignment", route: "comment-generator", showChildren: true, children: [
          { label: "Inbound", icon: "call_received", route: "inbound" },
          { label: "Chat", icon: "chat", route: "chat" },
          { label: "Followup", icon: "call_made", route: "followup" },
          { label: "Transfer", icon: "autorenew", route: "transfer" }
        ]
      },
      {
        label: "CCA Lookup", icon: "search", route: "cca-lookup"
      },
      {
        label: "Communications", icon: "rss_feed", route: "communications"
      },
    ];

    let devActions: Link[] = [
      // {
      //   label: "Communications", icon: "rss_feed", route: "communications"
      // },
      // {
      //   label: "Roster", icon: "dashboard", route: "roster"
      // },
      // {
      //   label: "Support Area Schedules", icon: "schedule", route: "schedules", children: [
      //     { label: "Team leaders", route: "tl" },
      //     { label: "SMEs", route: "sme" },
      //     { label: "QAs", route: "qa" }
      //   ]
      // }
    ];

    let actions: Link[] = prodActions;
    if (!this.prod) {
      actions.push(...devActions);
    }
    if (user.specialization === "Devices") {
      actions.push(
        {
          label: "Case assignment", icon: "work_outline", route: "case-assignment", showChildren: true, children: [
            { label: "PQM", route: "pqm" },
            { label: "Followups", route: "followups" }
          ]
        });
    }

    if (user.roster === "staff") {
      actions.push(
        {
          label: "Roster", icon: "dashboard", route: "roster"
        },
      );
    }
    return actions;
  }
  getPFIs(): void {
    if (this.pfis.getValue() === null) {
      this.http.get<any>(this.api, {
        params: {
          action: "getPFIs"
        }
      })
        .subscribe(pfis => this.pfis.next(pfis));
    }
  }

  getSchedules(group: string): void {
    if (this.pfis.getValue() === null) {
      this.http.get<any>(this.api, {
        params: {
          action: "getSchedules",
          group: group
        }
      })
        .subscribe(pfis => this.pfis.next(pfis));
    }
  }

}
