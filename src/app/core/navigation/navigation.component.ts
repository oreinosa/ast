import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Link } from 'src/app/shared/models/link';
import { SetupService } from '../setup.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  appName = "Agent Support Tool";
  quickLinksRefresh = false;
  links: Link[] = [];
  quickLinks: Link[] = [];

  actions: Link[] = [];
  quickLinksLimit: number = 5;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share(),
    );

  user: User;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private setupService: SetupService
  ) {
    this.getQuickLinks();
    this.setupService.user.subscribe(user => this.user = user);
    this.setupService.links.subscribe(_links => this.links = _links);
    this.setupService.actions.subscribe(_actions => this.actions = _actions)
  }

  toggleQuickLink(link: Link) {
    const index = this.quickLinks.findIndex(_link => _link.route === link.route);
    if (index >= 0) {
      this.removeQuickLink(index);
    } else {
      if (this.quickLinks.length < this.quickLinksLimit) {
        this.addQuickLink(link);
      } else {
        console.log("quicklinks limit already reached ")
      }
    }
    this.refreshQuickLinks();
  }

  openLink(href: string) {
    window.open(href, "_blank")
  }

  private refreshQuickLinks() {
    const quickLinksString = JSON.stringify(this.quickLinks);
    window.localStorage.setItem("quickLinks", quickLinksString);
    this.quickLinksRefresh = !this.quickLinksRefresh;
  }

  private getQuickLinks() {
    const quickLinksLocal = window.localStorage.getItem("quickLinks");
    const quickLinks: Link[] = JSON.parse(quickLinksLocal);
    if (!!quickLinks && quickLinks.length) {
      this.quickLinks = quickLinks;
    }
  }

  private removeQuickLink(index: number) {
    this.quickLinks.splice(index, 1);
  }

  private addQuickLink(link: Link) {
    this.quickLinks.push(link);
  }

}
